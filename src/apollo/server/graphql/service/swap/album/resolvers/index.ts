import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';
const Album = require('@Apollo/server/graphql/service/swap/album/models');

type listAlbums = {
  artist: {
    id: string;
  };
  offset: number;
  limit: number;
};

const resolverAlbum = {
  Query: {
    listAlbums: async (
      _: any,
      { filter }: { filter: listAlbums },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const albums = await Album.find()
        .where('artists.id')
        .in([filter.artist.id])
        .exec();

      await spotifyAPIToken();
      const artistAlbums = await CONFIG_SPOTIFY.SPOTIFY_API.getArtistAlbums(
        filter?.artist.id,
        {
          limit: filter?.limit ?? 50,
          offset: filter?.offset ?? 0
        }
      ).then((res) => res.body.items);

      for (const iterator of artistAlbums) {
        const isExistAlbum = await Album.find({
          id: iterator?.id
        });
        if (!isExistAlbum) {
          const newAlbum = new Album({
            ...iterator
          });

          await newAlbum.save();
        }
        return artistAlbums;
      }
      return albums;
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
        // console.log(albumResponse.body.tracks.items[0], "albumResponse ");

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
        // console.log(albumResponse.body.tracks.items[0], "albumResponse ");

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
