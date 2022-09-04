import { listAlbums } from '../../album/resolvers';
import listAlbumBySlug from '../../album/resolvers/listAlbumBySlug';
import listArtistBySlug from '../../artist/resolvers/listArtistBySlug';
import listPlaylistsBySlug from '../../playlist/resolvers/listPlaylistsBySlug';
import { ContextRoot } from '../../types';

const Artist = require('@Apollo/server/graphql/service/swap/artist/models');
const Album = require('@Apollo/server/graphql/service/swap/album/models');
const Track = require('@Apollo/server/graphql/service/swap/track/models');
const Playlist = require('@Apollo/server/graphql/service/swap/playlist/models');

const BYTYPES = {
  Artist: Artist,
  Album: Album,
  Track: Track,
  Playlist: Playlist
};

const GETRANDOMBYTYPE = async <T>(
  type: keyof typeof BYTYPES,
  limit: number
) => {
  const totalArtits = await BYTYPES[type].count().exec();
  let allResults = [] as T[];
  for (let index = 0; index < limit; index++) {
    const random = Math.floor(Math.random() * totalArtits);
    const resultArtists = await BYTYPES[type].findOne().skip(random).exec();
    if (resultArtists) {
      allResults.push(resultArtists);
    }
  }

  return allResults;
};

const getTypes = {
  artists: async (limit: number) => {
    const result = await GETRANDOMBYTYPE('Artist', limit);
    return result;
  },
  albums: async (limit: number) => {
    const result = await GETRANDOMBYTYPE('Album', limit);
    return result;
  },
  tracks: async (limit: number) => {
    const result = await GETRANDOMBYTYPE('Track', limit);
    return result;
  },
  playlist: async (limit: number) => {
    const result = await GETRANDOMBYTYPE('Playlist', limit);
    return result;
  },
  episode: () => {},
  show: () => {}
};

type GetTypes = ReturnType<() => typeof getTypes>;

const resolversGeneral = {
  Query: {
    listByType: async (
      _: any,
      {
        type,
        limit
      }: {
        type: ['artists', 'albums', 'tracks', 'playlist', 'episode', 'show'];
        limit: number;
      }
    ) => {
      let results = {} as GetTypes;
      for (const iterator of type) {
        const resultByType = await getTypes[iterator](limit ?? 10);
        results = { ...results, [iterator]: resultByType };
      }

      return results;
    },
    Search: async (
      _: any,
      args: { filter: listAlbums },
      context: ContextRoot
    ) => {
      const albums = await listAlbumBySlug(_, args, context);
      const artists = await listArtistBySlug(_, args, context);
      const playlists = await listPlaylistsBySlug(_, args, context);
      return {
        albums,
        artists,
        playlists
      };
    }
  },
  Mutation: {}
};

export default resolversGeneral;
