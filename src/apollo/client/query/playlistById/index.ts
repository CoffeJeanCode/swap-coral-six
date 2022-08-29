import { gql } from '@apollo/client';

export const PLAYLISTBYID = gql`
  query playListById($id: String!) {
    playListById(id: $id) {
      id
      name
      images {
        url
      }
      tracks {
        href
        items {
          id
          name
          album {
            id
            name
            images {
              url
            }
          }
          duration_ms
          track_number
          artists {
            id
            name
            type
          }
          explicit
          disc_number
          external_urls {
            spotify
          }
          uri
          track_number
          preview_url
          restrictions {
            reason
          }
          is_playable
        }
        limit
      }
    }
  }
`;
