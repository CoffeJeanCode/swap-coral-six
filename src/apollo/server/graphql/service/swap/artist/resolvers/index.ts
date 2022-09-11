import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';
import listArtistBySlug from './listArtistBySlug';

const Artist = require('@Apollo/server/graphql/service/swap/artist/models');
const Album = require('@Apollo/server/graphql/service/swap/album/models');

const resolvers = {
  Query: {
    listArtistBySlug: listArtistBySlug,
    artistById: async (
      _: any,
      {
        id
      }: {
        id: string;
      },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const artist = await Artist.findOne({ id: id });
      if (artist) {
        await spotifyAPIToken();
        const albumResponse = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getArtistAlbums(id)
        ).body;
        for (const iterator of albumResponse?.items) {
          const isExistAlbum = await Album.findOne({ id: iterator.id })
            .select('id')
            .lean();

          if (isExistAlbum === null) {
            const newAlbum = await new Album({
              ...iterator
            });
            await newAlbum.save();
          }
        }
      }

      if (!artist) {
        await spotifyAPIToken();
        const albumResponse = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getArtistAlbums(id)
        ).body;
        for (const iterator of albumResponse?.items) {
          const newAlbum = await new Album({
            ...iterator
          });
          await newAlbum.save();
        }
        const searchArtist = await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(
          id
        ).then((artist) => artist.body);
        const newArtist = await new Artist({
          ...searchArtist
        });
        await newArtist.save();
        return searchArtist;
      }
      return artist;
    }
  },

  Mutation: {}
};

export default resolvers;
