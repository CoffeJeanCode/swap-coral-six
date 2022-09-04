import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';
import listAlbumBySlug from './listAlbumBySlug';
const Album = require('@Apollo/server/graphql/service/swap/album/models');

export type listAlbums = {
  slug: string;
  offset: number;
  limit: number;
};

const resolverAlbum = {
  Query: {
    listAlbumBySlug: listAlbumBySlug,
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
