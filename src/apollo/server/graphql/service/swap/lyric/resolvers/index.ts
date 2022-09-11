import { CONFIG_SPOTIFY } from '@Config/spotify';
import getColorImage from '@Hooks/useColor/extractColors';
import lyricsFinder from 'lyrics-finder';
import { v4 as uuidv4 } from 'uuid';
import { ContextRoot } from '../../types';
import { Lyric } from '../models';

const Lyrc = require('@Apollo/server/graphql/service/swap/lyric/models');

type lyricByTrackId = {
  filter: {
    id: string;
  };
};

const getArtistByLyrc = async (
  artists: SpotifyApi.ArtistObjectSimplified[],
  spotifyAPIToken: () => string
) => {
  let result = [];
  await spotifyAPIToken();
  for (const iterator of artists) {
    const artistBySpotify = await (
      await CONFIG_SPOTIFY.SPOTIFY_API.getArtist(iterator.id)
    ).body;

    const colorByArtist = await getColorImage(artistBySpotify.images?.[0].url);
    result.push({
      id: artistBySpotify.id,
      name: artistBySpotify.name,
      image: artistBySpotify.images[0].url,
      color: colorByArtist?.[0]?.hex
    });
  }
  return result;
};

const resolverLyric = {
  Query: {
    lyricByTrackId: async (
      _: unknown,
      { filter }: lyricByTrackId,
      { spotifyAPIToken }: ContextRoot
    ) => {
      const lyric = await Lyrc.findOne({ id: filter.id });
      if (!lyric) {
        await spotifyAPIToken();
        const trackBySpoitfy = await (
          await CONFIG_SPOTIFY.SPOTIFY_API.getTrack(filter.id)
        ).body;

        const artistsByTrack = await getArtistByLyrc(
          trackBySpoitfy.artists,
          spotifyAPIToken
        );
        let lyricsFind = await lyricsFinder(
          trackBySpoitfy.artists[0].name,
          trackBySpoitfy.name
        );

        if (lyricsFind) {
          const newLyric = new Lyrc({
            id: filter.id,
            name: trackBySpoitfy.name,
            artists: artistsByTrack,
            duration: trackBySpoitfy.duration_ms,
            lyrics: lyricsFind
              .toString()
              ?.split(/(?:\r?\n)+/)
              ?.map((item: string) => ({
                id: uuidv4(),
                phrase: item,
                start: 0,
                artists: artistsByTrack,
                translates: [],
                notifies: []
              }))
          });

          await newLyric.save();
          return newLyric;
        } else {
          throw new Error('Not Found');
        }
      }
      return lyric;
    }
  },
  Mutation: {
    updateLyricByTrackId: async (
      _: unknown,
      { input }: updateLyricByTrackId
    ) => {
      const lyric = await Lyrc.findOneAndUpdate({ id: input.id }, input);
      await lyric.save();
      return lyric;
    }
  }
};
type updateLyricByTrackId = {
  input: {
    id: string;
  } & Lyric;
};
export default resolverLyric;
