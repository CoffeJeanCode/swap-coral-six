import { ApolloClient, InMemoryCache } from '@apollo/client';
import CONFIG from '@Config/index';

const clientGraphql = new ApolloClient({
  uri: CONFIG.GRAPHQL_URL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  ssrMode: true,
  queryDeduplication: true
});
export default clientGraphql;
