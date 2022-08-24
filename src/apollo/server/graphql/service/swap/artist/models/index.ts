import mongoose, { Schema } from 'mongoose'

const Artist: Schema = new Schema({
  external_urls: {
    spotify: {
      type: String,
    },
  },
  followers: {
    total: {
      type: Number,
    },
  },
  genres: {
    type: [String],
  },
  href: {
    type: String,
  },
  id: {
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
  name: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  type: {
    type: String,
  },
  uri: {
    type: String,
  },
  customize: {
    colors: {
      profile: {
        primary: {
          type: String,
        },
        secondary: {
          type: String,
        },
        tertiary: {
          type: String,
        },
      },
      background: {
        primary: {
          type: String,
        },
        secondary: {
          type: String,
        },
        tertiary: {
          type: String,
        },
      },
    },
  },
})

module.exports =
  mongoose.models.Artist ||
  mongoose.model<SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>>(
    'Artist',
    Artist
  )
