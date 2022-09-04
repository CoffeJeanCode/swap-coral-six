import { gql } from '@apollo/client';

export const SEARCHQUERY = gql`
  query Search($filter: ArtistFilter) {
    Search(filter: $filter) {
      artists {
        id
        name
        type
        images {
          url
        }
      }
      albums {
        id
        name
        type
        images {
          url
        }
      }
      playlists {
        id
        name
        type
        images {
          url
        }
        owner {
          display_name
        }
      }
    }
  }
`;
