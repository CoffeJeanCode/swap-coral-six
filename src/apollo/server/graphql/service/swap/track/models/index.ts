import mongoose, { Schema } from 'mongoose';

export type TracktYPE = {
  id: string;
  name: string;
  url: string;
};
const Audios: Schema = new Schema({
  id: {
    type: String
  },
  audio: {
    name: {
      type: String
    },
    artists: [
      {
        external_urls: {
          spotify: String
        },
        href: String,
        id: String,
        name: String,
        uri: String
      }
    ],
    urls: [
      {
        url: String
      }
    ]
  }
});

module.exports =
  mongoose.models.Audios || mongoose.model<TracktYPE>('Audios', Audios);
