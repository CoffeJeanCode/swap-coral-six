import { gql } from '@apollo/client';

export const ARTISTBYID = gql`
  query artistById($id: String!) {
    artistById(id: $id) {
      id
      name
      images {
        url
        height
        width
      }
      uri
      followers {
        total
      }
      type
      genres
      href
    }
  }
`;
