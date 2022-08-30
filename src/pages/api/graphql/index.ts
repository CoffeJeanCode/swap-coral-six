import { spotifyAPIToken } from '@Apollo/server/graphql/config/spotify';
import ConnectMongoDB from '@Apollo/server/graphql/database';
import resolvers from '@Apollo/server/graphql/resolvers';
import typeDefs from '@Apollo/server/graphql/types';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
const cors = Cors();

ConnectMongoDB();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  introspection: true,
  csrfPrevention: true,
  context: async ({ req }) => ({
    spotifyAPIToken,
    req
  })
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false
  }
};
