import { CONFIG_SPOTIFY } from '@Config/spotify';
import { ContextRoot } from '../../../types';

const Playlist = require('@Apollo/server/graphql/service/swap/playlist/models');

type Filter = {
  slug: string;
  limit: number;
  offset: number;
};

const listPlaylistsBySlug = async (
  _: any,
  { filter }: { filter: Filter },
  { spotifyAPIToken }: ContextRoot
) => {
  await spotifyAPIToken();
  const playlists = await CONFIG_SPOTIFY.SPOTIFY_API.searchPlaylists(
    filter?.slug,
    {
      limit: filter?.limit ?? 50,
      offset: filter?.offset ?? 0
    }
  ).then((response) => response.body.playlists?.items);

  for (const iterator of playlists || []) {
    const IsSave = await Playlist.find({
      id: iterator.id
    })
      .select('id')
      .lean();

    if (!IsSave) {
      const newPlaylist = new Playlist({
        ...iterator,
        tracks: {
          href: '',
          limit: 0,
          next: '',
          offset: 0,
          previous: '',
          total: 0,
          items: []
        }
      });
      await newPlaylist.save();
    }
  }

  return playlists;
};

export default listPlaylistsBySlug;
