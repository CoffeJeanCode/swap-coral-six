import { gql } from 'apollo-server-core'

const typeDefsLyric = gql`
  type Notify {
    id: String
    message: String
    user_name: String
  }
  type ArtistByLyric {
    id: String
    name: String
    image: String
    color: String
  }
  type Translate {
    id: String
    phrase: String
    lang: String
  }
  type Lyric {
    id: String
    phrase: String
    start: Int
    translates: [Translate]
    artists: [ArtistByLyric]
    notifies: [Notify]
  }
  type LyricByTrack {
    id: String
    name: String
    artists: [ArtistByLyric]
    duration: Int
    lyrics: [Lyric]
  }
  input lyricByTrackInput {
    id: String!
  }
  input ArtistByLyricInput {
    id: String
    name: String
    image: String
    color: String
  }
  input TranslateInput {
    id: String
    phrase: String
    lang: String
  }
  input NotifyInput {
    id: String
    message: String
    user_name: String
  }
  input LyricInput {
    id: String!
    phrase: String!
    start: Int!
    artists: [ArtistByLyricInput]
    translates: [TranslateInput]
    notifies: [NotifyInput]
  }
  input UpdateLyricByTrackInput {
    id: String!
    name: String
    duration: Int
    lyrics: [LyricInput]
  }
  type Query {
    lyricByTrackId(filter: lyricByTrackInput): LyricByTrack
  }
  type Mutation {
    updateLyricByTrackId(input: UpdateLyricByTrackInput): LyricByTrack
  }
`
export default typeDefsLyric
