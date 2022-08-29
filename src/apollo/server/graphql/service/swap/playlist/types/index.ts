import { gql } from 'apollo-server-micro';

const typeDefsPlaylist = gql`
  type Owner {
    display_name: String
    external_urls: Spotify
    href: String
    id: String
    type: String
    uri: String
  }
  type PlaylistTracks {
    href: String
    items: [Song]
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
  }
  type listPlaylistsBySlug {
    collaborative: Boolean
    description: String
    external_urls: Spotify
    href: String
    id: String
    images: [Image]
    name: String
    owner: Owner
    public: Boolean
    snapshot_id: String
    tracks: PlaylistTracks
    type: String
    uri: String
  }
  type Query {
    listPlaylistsBySlug(slug: String!): [listPlaylistsBySlug]
    playListById(id: String!): listPlaylistsBySlug
  }
`;
export default typeDefsPlaylist;
