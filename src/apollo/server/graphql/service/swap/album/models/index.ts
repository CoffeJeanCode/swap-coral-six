import mongoose, { Schema } from "mongoose";
import { GlobalProps } from "../../types";

export type AlbumType = GlobalProps &
  SpotifyApi.AlbumObjectSimplified &
  SpotifyApi.SingleAlbumResponse;

export const Album: Schema = new Schema<AlbumType>({
  id: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
  },
  total_tracks: {
    type: Number,
  },
  restrictions: {
    type: Object,
  },
  release_date_precision: {
    type: String,
  },
  release_date: {
    type: String,
  },
  images: [
    {
      url: {
        type: String,
      },
      height: {
        type: Number,
      },
      width: {
        type: Number,
      },
    },
  ],
  external_urls: {
    spotify: {
      type: String,
    },
  },
  available_markets: {
    type: [String],
  },
  artists: [
    {
      name: {
        type: String,
      },
      id: {
        type: String,
      },
      type: {
        type: String,
      },
      href: {
        type: String,
      },
      external_urls: {
        spotify: {
          type: String,
        },
      },
      uri: {
        type: String,
      },
    },
  ],
  album_type: {
    type: String,
  },
  album_group: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  href: {
    type: String,
  },
  external_ids: {
    isrc: {
      type: String,
    },
    ean: {
      type: String,
    },
    upc: {
      type: String,
    },
  },
  genres: {
    type: [String],
  },
  label: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  tracks: {
    href: {
      type: String,
    },
    items: [
      {
        artists: [
          {
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
            name: {
              type: String,
            },
            type: {
              type: String,
            },
            uri: {
              type: String,
            },
          },
        ],
        available_markets: {
          type: [String],
        },
        disc_number: {
          type: Number,
        },
        duration_ms: {
          type: Number,
        },
        explicit: {
          type: Boolean,
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
        is_playable: {
          type: Boolean,
        },
        linked_from: {
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
        restrictions: {
          reason: {
            type: String,
          },
        },
        name: {
          type: String,
        },
        preview_url: {
          type: String,
        },
        track_number: {
          type: Number,
        },
        type: {
          type: String,
        },
        uri: {
          type: String,
        },
      },
    ],
    limit: {
      type: Number,
    },
    next: {
      type: String,
    },
    offset: {
      type: Number,
    },
    previous: {
      type: String,
    },
    total: {
      type: Number,
    },
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
  mongoose.models.Albums || mongoose.model<AlbumType>("Albums", Album);
