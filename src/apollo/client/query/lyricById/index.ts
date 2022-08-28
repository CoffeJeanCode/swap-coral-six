import { gql } from '@apollo/client';

export const LYRICBYTRACKID = gql`
  query lyricByTrackId($filter: lyricByTrackInput) {
    lyricByTrackId(filter: $filter) {
      id
      duration
      name
      artists {
        name
        id
      }
      lyrics {
        id
        phrase
        start
        translates {
          id
          phrase
          lang
        }
        artists {
          id
          name
          image
          color
        }
      }
    }
  }
`;
