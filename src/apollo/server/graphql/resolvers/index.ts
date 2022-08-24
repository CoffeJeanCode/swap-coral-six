/* eslint-disable no-console */
// import Artist from '@GraphQl/service/swap/artist/models'
import resolverAlbum from '@Apollo/server/graphql/service/swap/album/resolvers'
import * as resolversArtist from '@Apollo/server/graphql/service/swap/artist/resolvers'
import resolversGeneral from '@Apollo/server/graphql/service/swap/general/resolvers'
import resolverPlaylist from '@Apollo/server/graphql/service/swap/playlist/resolvers'
import resolverTracks from '@Apollo/server/graphql/service/swap/track/resolvers'
import resolverLyric from '../service/swap/lyric/resolvers'
const resolvers = {
  Query: {
    ...resolversArtist.default.Query,
    ...resolverAlbum.Query,
    ...resolverTracks.Query,
    ...resolverPlaylist.Query,
    ...resolversGeneral.Query,
    ...resolverLyric.Query,
  },
  Mutation: {
    ...resolversArtist.default.Mutation,
    ...resolverAlbum.Mutation,
    ...resolverTracks.Mutation,
    ...resolverPlaylist.Mutation,
    ...resolversGeneral.Mutation,
    ...resolverLyric.Mutation,
  },
}

export default resolvers
