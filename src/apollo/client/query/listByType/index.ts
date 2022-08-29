import { gql } from '@apollo/client';

export const LISTBYTYPE = gql`
  query listByType($type: [String], $limit: Int) {
    listByType(type: $type, limit: $limit) {
      artists {
        id
        name
        type
        images {
          url
          __typename
        }
        __typename
      }
      playlist {
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
      __typename
    }
  }
`;
