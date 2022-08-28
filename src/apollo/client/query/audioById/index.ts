import { gql } from '@apollo/client';

export const audioById = gql`
  query audioById($id: String) {
    audioById(id: $id) {
      id
      audio {
        name
        artists {
          name
          id
        }
        urls {
          url
        }
      }
    }
  }
`;
