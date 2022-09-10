import { gql } from 'apollo-server-micro';

const typeDefsAlbum = gql`
  type AlbumWithOptions {
    href: String
    limit: Int
    next: String
    offset: Int
    previous: String
    page: Int
    total: Int
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    items: [AlbumType]
  }
  type RestrictionsObject {
    reason: String
  }
  type TrackLinkObject {
    external_urls: Spotify
    href: String
    id: String
    type: String
    uri: String
  }
  type TrackArtist {
    external_urls: Spotify
    href: String
    id: String
    name: String
    type: String
    uri: String
  }
  type Song {
    artists: [TrackArtist]
    available_markets: [String]
    disc_number: Int
    duration_ms: Int
    explicit: Boolean
    external_urls: Spotify
    href: String
    id: String
    is_playable: Boolean
    linked_from: TrackLinkObject
    restrictions: RestrictionsObject
    name: String
    preview_url: String
    track_number: Int
    type: String
    uri: String
  }
  type font {
    color: String
  }
  type background {
    color: String
  }
  type Custmize {
    font: font
    background: background
  }
  extend type AlbumType {
    customize: Custmize
  }
  extend type Song {
    album: AlbumType
  }

  type RestrictionsObject {
    reason: String
  }
  type ExternalIds {
    isrc: String
    ean: String
    upc: String
  }
  type TracksFilterByAlbum {
    href: String
    items: [Song]
    limit: Int
    next: String
    offset: Int
    previous: String
    total: Int
  }
  type AlbumType {
    id: String
    uri: String
    total_tracks: Int
    restrictions: RestrictionsObject
    release_date_precision: String
    release_date: String
    images: [Image]
    external_urls: Spotify
    available_markets: [String]
    copyrights: String
    external_ids: ExternalIds
    genres: [String]
    label: String
    tracks: TracksFilterByAlbum
    popularity: Int
    artists: [Artist]
    album_type: String
    album_group: String
    name: String
    type: String
    href: String
    customize: Custmize
  }

  input fontInput {
    color: String
  }
  input backgroundInput {
    color: String
  }
  input CustomizeInput {
    font: fontInput
    background: backgroundInput
  }
  input SongInput {
    id: String!
    name: String!
    album_id: String!
    duration: Int!
    image: String
    url: String!
  }
  input AlbumInput {
    id: String!
    name: String!
    description: String
    songs: [SongInput]
    image: String
    type: String
    author: String!
    href: String
    backgroundCover: String
    customize: CustomizeInput
    biography: String
  }

  type deleteAlbum {
    message: String
  }

  input deleteAlbumInput {
    id: String
  }
  input listAlbumsArtistInput {
    id: String
  }
  input listAlbumsInput {
    artist: listAlbumsArtistInput
    slug: String
    limit: Int
    offset: Int
    page: Int
  }
  type Query {
    listAlbums(filter: listAlbumsInput): AlbumWithOptions
    listAlbumBySlug(filter: listAlbumsInput): [AlbumType]
    albumById(id: String!): AlbumType
  }
  type Mutation {
    deleteAlbum(input: deleteAlbumInput!): deleteAlbum
  }
`;
export default typeDefsAlbum;
