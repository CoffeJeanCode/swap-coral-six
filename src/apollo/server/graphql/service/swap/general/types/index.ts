import { gql } from 'apollo-server-micro';

const typesDefsGeneral = gql`
  type listByType {
    artists: [Artist]
    albums: [AlbumType]
    # tracks: [Track]
    playlist: [listPlaylistsBySlug]
  }

  type Search {
    artists: [Artist]
    albums: [AlbumType]
    # tracks: [Track]
    playlists: [listPlaylistsBySlug]
  }

  type Query {
    listByType(type: [String], limit: Int): listByType
    Search(filter: ArtistFilter): Search
  }
`;

export default typesDefsGeneral;
