import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type CustomizeColors {
    primary: String
    secondary: String
    tertiary: String
  }

  type CustomizeColorsByType {
    profile: CustomizeColors
    background: CustomizeColors
  }

  type Customize {
    colors: CustomizeColorsByType
  }
  type ArtistFollowers {
    href: String
    total: Int
  }
  type Image {
    url: String
    height: Int
    width: Int
  }
  type Spotify {
    spotify: String
  }
  type Artist {
    external_urls: Spotify
    followers: ArtistFollowers
    genres: [String]
    href: String
    id: String
    images: [Image]
    name: String
    popularity: Int
    type: String
    uri: String
    customize: Customize
  }

  input ArtistFilter {
    slug: String!
  }

  type Query {
    listArtistBySlug(filter: ArtistFilter): [Artist]
    artistById(id: String!): Artist
  }
`
export default typeDefs
