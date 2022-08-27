import { gql } from '@apollo/client';

export const LISTALBUMSBYARTISTID = gql`
  query listAlbums($filter: listAlbumsInput) {
    listAlbums(filter: $filter) {
      id
      name
      label
      total_tracks
      images {
        url
      }
      album_type
      release_date
    }
  }
`;
