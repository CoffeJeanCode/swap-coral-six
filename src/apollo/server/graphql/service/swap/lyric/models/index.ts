import mongoose, { Schema } from 'mongoose'
import { GlobalProps } from '../../types'

type ArtistByLyric = {
  id: string
  name: string
  image: string
  color: string
}
export type Lyric = GlobalProps & {
  id: string
  name: string
  duration: number
  artists: ArtistByLyric[]
  lyrics: {
    id: string
    phrase: string
    start: number
    translates: {
      id: string
      phrase: string
      lang: string
    }[]
    artists: ArtistByLyric[]
    notifies: {
      id: string
      user_name: string
      message: string
    }
  }[]
}

const Lyric: Schema = new Schema<Lyric>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
  artists: [
    {
      id: String,
      name: String,
      image: String,
      color: String,
    },
  ],
  lyrics: [
    {
      id: String,
      phrase: String,
      start: Number,
      translates: [
        {
          id: String,
          lang: String,
          phrase: String,
        },
      ],
      artists: [
        {
          id: String,
          name: String,
          image: String,
          color: String,
        },
      ],
      notifies: [
        {
          id: String,
          message: String,
          user_name: String,
        },
      ],
    },
  ],
})
module.exports = mongoose.models.Lyric || mongoose.model<Lyric>('Lyric', Lyric)
