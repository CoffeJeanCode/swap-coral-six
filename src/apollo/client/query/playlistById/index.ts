import { gql } from '@apollo/client';

export const PLAYLISTBYID = gql`
  query playListById($id: String!) {
    playListById(id: $id) {
      id
      name
      owner {
        display_name
        external_urls {
          spotify
        }
        href
        id
        type
        uri
      }
      images {
        url
        __typename
      }
      tracks {
        href
        total
        items {
          id
          name
          album {
            id
            name
            images {
              url
              __typename
            }
            __typename
          }
          duration_ms
          track_number
          artists {
            id
            name
            type
            __typename
          }
          explicit
          disc_number
          external_urls {
            spotify
            __typename
          }
          uri
          track_number
          preview_url
          restrictions {
            reason
            __typename
          }
          is_playable
          __typename
        }
        limit
        __typename
      }
      __typename
    }
  }
`;
