import { youtube } from 'scrape-youtube';
import ytdl from 'ytdl-core';
const Track = require('@Apollo/server/graphql/service/swap/track/models');
7;
type trackBySlug = {
  slug: string;
};

const resolverTracks = {
  Query: {
    trackBySlug: async (_: any, { slug }: trackBySlug) => {
      const track = await Track.findOne({ slug });
      if (!track) {
        const videos = await youtube
          .search(slug)
          .then(async (results) => results.videos);

        let info = await ytdl.getInfo(videos[0].link);
        let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        let videoformats = ytdl.chooseFormat(info.formats, {
          quality: 'highestvideo'
        });

        for (const iterator of audioFormats) {
          const isValid = await fetch(iterator.url).then((res) => res.ok);
          if (isValid) {
            const track = new Track({
              slug,
              id: videos[0].id,
              url: iterator.url,
              youtube_url: videos[0].link,
              youtube_video: videoformats.url
            });
            await track.save();
            return track;
          }
        }
      }
      if (track) {
        const verifyIsExpired = (await fetch(track.url)).status === 200;
        if (!verifyIsExpired) {
          const videos = await youtube
            .search(slug)
            .then(async (results) => results.videos);

          let info = await ytdl.getInfo(videos[0].link);
          let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

          let videoformats = ytdl.chooseFormat(info.formats, {
            quality: 'highestvideo'
          });

          track.id = videos[0].id;
          track.youtube_url = videos[0].link;
          track.url = audioFormats[0].url;
          track.youtube_video = videoformats.url;
          await track.save();
          return track;
        }
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
