import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';
import listAlbumBySlug from './listAlbumBySlug';
const Album = require('@Apollo/server/graphql/service/swap/album/models');

export type listAlbums = {
  artist?: {
    id: string;
  };
  page: number;
  slug: string;
  offset: number;
  limit: number;
};

const resolverAlbum = {
  Query: {
    listAlbumBySlug: listAlbumBySlug,
    listAlbums: async (
      _: any,
      { filter }: { filter: listAlbums },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const perPage = 50;
      const page = Math.max(0, filter?.page ?? 0);
      const albums = await Album.find()
        .where('artists.id')
        .limit(perPage)
        .skip(perPage * page)
        .sort({ release_date: -1 })
        .in([filter.artist?.id]);

      const TOTALALBUMS = await Album.find()
        .where('artists.id')
        .sort({ release_date: -1 })
        .in([filter.artist?.id])
        .count();

      await spotifyAPIToken();

      await spotifyAPIToken();
      const artistAlbums = await CONFIG_SPOTIFY.SPOTIFY_API.getArtistAlbums(
        filter?.artist?.id as string,
        {
          limit: filter?.limit || 50,
          offset: filter?.offset || 0
        }
      ).then((res) => res.body);

      for (const iterator of artistAlbums?.items) {
        const isExistAlbum = await Album.findOne({
          id: iterator?.id
        })
          .select('id')
          .lean();

        if (!isExistAlbum) {
          const newAlbum = new Album({
            ...iterator
          });

          await newAlbum.save();
        }
      }

      return {
        href: '',
        limit: 50,
        next: '',
        hasNextPage: albums?.length > 0 ? true : false,
        hasPreviousPage: page !== 0 ? true : false,
        page: page,
        offset: filter?.offset,
        previous: '',
        total: TOTALALBUMS,
        items:
          albums?.length > 0
            ? albums
            : artistAlbums?.items?.filter((item) =>
                item.artists.some((artist) => artist.id === filter?.artist?.id)
              )
      };
    },
    albumById: async (
      root: any,
      { id }: { id: string },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const album = await Album.findOne({ id });
      // console.log("albumById", album);
      if (album === null) {
        await spotifyAPIToken();
        const albumResponse = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(id)
        ).body;

        const newAlbum = await new Album({
          ...albumResponse
        });
        return newAlbum;
      }

      if (album?.tracks.items.length === 0) {
        await spotifyAPIToken();
        const albumResponse = await CONFIG_SPOTIFY.SPOTIFY_API.getAlbum(id);

        const newAlbum = await Album.findOneAndUpdate(
          { id },
          {
            ...albumResponse.body
          },
          { new: true }
        );
        return newAlbum;
      }
      return album;
    }
  },
  Mutation: {
    deleteAlbum: async (_: any, { input }: { input: { id: string } }) => {
      try {
        const albums = await Album.findOneAndDelete({ id: input?.id });
        //put message if not found
        if (!albums) {
          return {
            message: 'Album not found'
          };
        } else {
          return {
            message: 'Album deleted'
          };
        }
      } catch (error) {
        throw new Error(error as string);
      }
    }
  }
};

export default resolverAlbum;
