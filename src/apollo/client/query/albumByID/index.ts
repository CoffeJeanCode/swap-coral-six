import { gql } from '@apollo/client';

export const albumByID = gql`
  query albumById($id: String!) {
    albumById(id: $id) {
      id
      name
      images {
        url
      }
      total_tracks
      tracks {
        href
        items {
          id
          name
          duration_ms
          track_number
        }
        limit
      }
      release_date
      album_type
      artists {
        id
        name
        followers {
          total
        }
        images {
          url
        }
      }
    }
  }
`;
