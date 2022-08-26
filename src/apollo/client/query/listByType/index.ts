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
        }
      }
    }
  }
`;
