import { gql } from 'apollo-server-micro';

const typeDefsTrack = gql`
  type AudioUrls {
    url: String
  }
  type AudioExternalArtis {
    spotify: String
  }
  type AudioArtists {
    external_urls: AudioExternalArtis
    href: String
    id: String
    name: String
    type: String
    uri: String
  }
  type Audio {
    name: String
    artists: [AudioArtists]
    urls: [AudioUrls]
  }

  type Track {
    id: String
    audio: Audio
  }
  input INPUTEDITLYRICS {
    id: String
    lyric: String
    time: Int
    artist: String
    line: Int
  }
  type Query {
    audioById(id: String): Track
  }
  type Mutation {
    createSyncronousTrack(slug: String, edit_lyrics: [INPUTEDITLYRICS]): Track
  }
`;

export default typeDefsTrack;
