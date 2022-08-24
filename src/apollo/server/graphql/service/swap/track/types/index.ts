import { gql } from "apollo-server-micro";

const typeDefsTrack = gql`
  type EDITLYRICS {
    id: String
    lyric: String
    time: Int
    artist: String
    line: Int
  }
  type Track {
    id: String
    slug: String
    url: String
    youtube_url: String
    youtube_video: String
    lyrics: String
    isSyncronous: Boolean
    edit_lyrics: [EDITLYRICS]
  }
  input INPUTEDITLYRICS {
    id: String
    lyric: String
    time: Int
    artist: String
    line: Int
  }
  type Query {
    trackBySlug(slug: String, artist: String, title_track: String): Track
  }
  type Mutation {
    createSyncronousTrack(slug: String, edit_lyrics: [INPUTEDITLYRICS]): Track
  }
`;

export default typeDefsTrack;
