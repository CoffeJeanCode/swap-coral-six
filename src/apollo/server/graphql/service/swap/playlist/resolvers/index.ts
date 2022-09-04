import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../types';
import listPlaylistsBySlug from './listPlaylistsBySlug';

const Playlist = require('@Apollo/server/graphql/service/swap/playlist/models');

const resolverPlaylist = {
  Query: {
    listPlaylistsBySlug: listPlaylistsBySlug,
    playListById: async (
      _: any,
      { id }: { id: string },
      { spotifyAPIToken }: ContextRoot
    ) => {
      const playlist = await Playlist.findOne({
        id: id
      });

      if (playlist?.tracks?.items?.length === 0) {
        await spotifyAPIToken();
        const newPlayist = await CONFIG_SPOTIFY.SPOTIFY_API.getPlaylist(
          id
        ).then((res) => res.body);

        playlist.tracks.href = newPlayist?.tracks?.href;
        playlist.tracks.limit = newPlayist?.tracks?.limit;
        playlist.tracks.next = newPlayist?.tracks?.next;
        playlist.tracks.offset = newPlayist?.tracks?.offset;
        playlist.tracks.previous = newPlayist?.tracks?.previous;
        playlist.tracks.total = newPlayist?.tracks?.total;
        playlist.tracks.items = newPlayist?.tracks?.items?.map(
          (item, index) => ({
            ...item.track,
            track_number: index + 1
          })
        );
        await playlist.save();
        return playlist;
      }
      return playlist;
    }
  },
  Mutation: {}
};

export default resolverPlaylist;
