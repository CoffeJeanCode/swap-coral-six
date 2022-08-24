import typeDefsAlbum from '@Apollo/server/graphql/service/swap/album/types'
import typeDefsArtists from '@Apollo/server/graphql/service/swap/artist/types'
import typesDefsGeneral from '@Apollo/server/graphql/service/swap/general/types'
import typeDefsPlaylist from '@Apollo/server/graphql/service/swap/playlist/types'
import typeDefsTrack from '@Apollo/server/graphql/service/swap/track/types'
import { gql } from 'apollo-server-micro'
import typeDefsLyric from '../service/swap/lyric/types'

const typeDefs = gql`
  ${typeDefsArtists}
  ${typeDefsAlbum}
  ${typeDefsTrack}
  ${typeDefsPlaylist}
  ${typesDefsGeneral}
  ${typeDefsLyric}
`

export default typeDefs
