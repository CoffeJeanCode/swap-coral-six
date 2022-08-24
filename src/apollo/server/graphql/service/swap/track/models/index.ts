import mongoose, { Schema } from "mongoose";

export type TracktYPE = {
  id: string;
  name: string;
  url: string;
};

const Track: Schema = new Schema({
  id: {
    type: String,
  },
  /* Defining the name property of the Track model. */
  slug: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  youtube_url: {
    type: String,
  },
  youtube_video: {
    type: String,
  },
  lyrics: {
    type: String,
  },
  edit_lyrics: [
    {
      id: {
        type: String,
      },
      lyric: {
        type: String,
      },
      time: {
        type: Number,
      },
      artist: {
        type: String,
      },
      line: {
        type: Number,
      },
    },
  ],
  isSyncronous: {
    type: Boolean,
  },
});

module.exports =
  mongoose.models.Track || mongoose.model<TracktYPE>("Track", Track);
