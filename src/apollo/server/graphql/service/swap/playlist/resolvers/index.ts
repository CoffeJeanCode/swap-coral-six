import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';

const Playlist = require('@Apollo/server/graphql/service/swap/playlist/models');

const resolverPlaylist = {
  Query: {
    listPlaylistsBySlug: async (
      _: any,
      { slug }: { slug: string },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const isExistPlaylist = await Playlist.find({
        name: slug
      });

      if (isExistPlaylist.length === 0) {
        await spotifyAPIToken();
        const playlist = await CONFIG_SPOTIFY.SPOTIFY_API.search(slug, [
          'playlist',
          'track'
        ]).then((response) => response.body.playlists?.items);

        for (const iterator of playlist || []) {
          const newPlaylist = new Playlist({
            ...iterator
          });

          await newPlaylist.save();
        }

        return playlist;
      }
      return isExistPlaylist;
    }
  },
  Mutation: {}
};

export default resolverPlaylist;
