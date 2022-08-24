import mongoose, { Schema } from "mongoose";
import { GlobalProps } from "../../types";

export type Playlist = GlobalProps & SpotifyApi.PlaylistObjectSimplified;

export const Playlist: Schema = new Schema<Playlist>({
  collaborative: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  external_urls: {
    spotify: {
      type: String,
    },
  },
  href: {
    type: String,
  },
  id: {
    type: String,
  },
  images: [
    {
      height: {
        type: Number,
      },
      url: {
        type: String,
      },
      width: {
        type: Number,
      },
    },
  ],
  name: {
    type: String,
  },
  owner: {
    display_name: {
      type: String,
    },
    external_urls: {
      spotify: {
        type: String,
      },
    },
    href: {
      type: String,
    },
    id: {
      type: String,
    },
    type: {
      type: String,
    },
    uri: {
      type: String,
    },
  },
  public: {
    type: Boolean,
  },
  snapshot_id: {
    type: String,
  },
  tracks: {
    href: {
      type: String,
    },
    total: {
      type: Number,
    },
  },
  type: {
    type: String,
  },
  uri: {
    type: String,
  },
  customize: {
    font: {
      color: String,
    },
    background: {
      color: String,
    },
  },
});

module.exports =
  mongoose.models.Playlist || mongoose.model<Playlist>("Playlist", Playlist);
