/* eslint-disable no-console */
import { CONFIG_SPOTIFY } from '@Config/spotify';
import { youtube } from 'scrape-youtube';
import ytdl from 'ytdl-core';
import { ContextRoot } from '../../types';
const Track = require('@Apollo/server/graphql/service/swap/track/models');

type audioById = {
  id: string;
};

const resolverTracks = {
  Query: {
    audioById: async (
      _: unknown,
      { id }: audioById,
      { spotifyAPIToken }: ContextRoot
    ) => {
      const track = await Track.findOne({ id });
      if (!track) {
        await spotifyAPIToken();
        const trackBySpotify = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getTrack(id)
        ).body;
        const nameTrack = trackBySpotify?.name;
        const artistsTrack = trackBySpotify.artists
          .map((item) => item.name)
          ?.join();
        const videos = await youtube
          .search(`${artistsTrack} ${nameTrack}`)
          .then(async (results) => results.videos);

        let info = await ytdl.getInfo(videos[0].link);
        let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        const track = new Track({
          id: id,
          audio: {
            name: nameTrack,
            artists: trackBySpotify?.artists,
            urls: audioFormats
          }
        });
        await track.save();
        return track;
      }
      if (track) {
        await spotifyAPIToken();
        const trackBySpotify = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getTrack(id)
        ).body;
        const nameTrack = trackBySpotify?.name;
        const artistsTrack = trackBySpotify.artists
          .map((item) => item.name)
          ?.join();
        const videos = await youtube
          .search(`${artistsTrack} ${nameTrack}`)
          .then(async (results) => results.videos);

        let info = await ytdl.getInfo(videos[0].link);
        let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        track.id = id;
        track.audio = {
          name: nameTrack,
          artists: trackBySpotify.artists,
          urls: audioFormats
        };
        await track.save();
        return track;
      }
    }
  },
  Mutation: {
    createSyncronousTrack: async (_: any, { slug, edit_lyrics }: Mutation) => {
      const track = await Track.findOne({ slug });
      if (track) {
        track.edit_lyrics = edit_lyrics;
        track.isSyncronous = true;
        await track.save();
        return track;
      }
    }
  }
};

type Mutation = {
  slug: string;
  edit_lyrics: createSyncronousTrack[];
};

type createSyncronousTrack = {
  id: string;
  lyric: string;
  time: number;
  artist: string;
  line?: number;
};
export default resolverTracks;
