import mongoose, { Schema } from 'mongoose';
import { GlobalProps } from '../../types';

export type Playlist = GlobalProps & SpotifyApi.PlaylistObjectSimplified;

export const Playlist: Schema = new Schema<Playlist>({
  collaborative: {
    type: Boolean
  },
  description: {
    type: String
  },
  external_urls: {
    spotify: {
      type: String
    }
  },
  href: {
    type: String
  },
  id: {
    type: String
  },
  images: [
    {
      height: {
        type: Number
      },
      url: {
        type: String
      },
      width: {
        type: Number
      }
    }
  ],
  name: {
    type: String
  },
  owner: {
    display_name: {
      type: String
    },
    external_urls: {
      spotify: {
        type: String
      }
    },
    href: {
      type: String
    },
    id: {
      type: String
    },
    type: {
      type: String
    },
    uri: {
      type: String
    }
  },
  public: {
    type: Boolean
  },
  snapshot_id: {
    type: String
  },
  tracks: {
    limit: {
      type: Number
    },
    next: {
      type: String
    },
    offset: {
      type: Number
    },
    previous: {
      type: String
    },
    items: [
      {
        album: {
          album_type: String,
          artists: [
            {
              id: String,
              name: String,
              uri: String,
              href: String,
              external_urls: {
                spotify: String
              }
            }
          ],
          external_urls: {
            spotify: String
          },
          href: String,
          id: String,
          name: String,
          images: [
            {
              url: String,
              width: Number,
              height: Number
            }
          ],
          release_date: String,
          release_date_precision: String,
          total_tracks: Number,
          uri: String,
          album_group: String
        },
        artists: [
          {
            id: String,
            name: String,
            uri: String,
            href: String,
            external_urls: {
              spotify: String
            }
          }
        ],
        disc_number: Number,
        duration_ms: Number,
        href: String,
        id: String,
        name: String,
        popularity: Number,
        preview_url: String,
        track_number: Number,
        uri: String
      }
    ],
    href: {
      type: String
    },
    total: {
      type: Number
    }
  },
  type: {
    type: String
  },
  uri: {
    type: String
  },
  customize: {
    font: {
      color: String
    },
    background: {
      color: String
    }
  }
});

module.exports =
  mongoose.models.Playlist || mongoose.model<Playlist>('Playlist', Playlist);
