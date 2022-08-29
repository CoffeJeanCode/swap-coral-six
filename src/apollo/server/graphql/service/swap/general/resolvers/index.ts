const Artist = require('@Apollo/server/graphql/service/swap/artist/models');
const Album = require('@Apollo/server/graphql/service/swap/album/models');
const Track = require('@Apollo/server/graphql/service/swap/track/models');
const Playlist = require('@Apollo/server/graphql/service/swap/playlist/models');

const getTypes = {
  artists: async (limit: number) => {
    const totalArtits = await Artist.count().exec();
    let allResults = [] as SpotifyApi.ArtistObjectFull[];
    for (let index = 0; index < limit; index++) {
      const random = Math.floor(Math.random() * totalArtits);
      const resultArtists = await Artist.findOne().skip(random).exec();
      if (resultArtists) {
        allResults.push(resultArtists);
      }
    }

    return allResults;
  },
  albums: async (limit: number) => {
    const totalAlbums = await Album.count().exec();
    let allResults = [] as SpotifyApi.AlbumObjectSimplified[];
    for (let index = 0; index < limit; index++) {
      const random = Math.floor(Math.random() * totalAlbums);
      const resultAlbum = await Album.findOne().skip(random).exec();
      if (resultAlbum) {
        allResults.push(resultAlbum);
      }
    }
    return allResults;
  },
  tracks: async (limit: number) => {
    const totalTracks = Track.count().exec();
    let allResults = [] as SpotifyApi.TrackObjectFull[];
    for (let index = 0; index < limit; index++) {
      const random = Math.floor(Math.random() * totalTracks);
      const resultAlbum = await Album.findOne().skip(random).exec();
      if (resultAlbum) {
        allResults.push(resultAlbum);
      }
    }
    return allResults;
  },
  playlist: async (limit: number) => {
    const totalTracks = await Playlist.count().exec();
    let allResults = [] as SpotifyApi.TrackObjectFull[];
    for (let index = 0; index < limit; index++) {
      const random = Math.floor(Math.random() * totalTracks);
      const resultAlbum = await Playlist.findOne().skip(random).exec();
      if (resultAlbum) {
        allResults.push(resultAlbum);
      }
    }
    return allResults;
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
    }
  },
  Mutation: {}
};

export default resolversGeneral;
