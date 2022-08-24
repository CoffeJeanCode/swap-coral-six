import { gql } from "apollo-server-micro";

const typesDefsGeneral = gql`
  type listByType {
    artists: [Artist]
    albums: [AlbumType]
    tracks: [Track]
    playlist: [listPlaylistsBySlug]
  }
  type Query {
    listByType(type: [String], limit: Int): listByType
  }
`;

export default typesDefsGeneral;
