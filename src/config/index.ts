const CONFIG = {
  GRAPHQL_URL:
    process.env.GRAPHQL_SERVER_URL || 'http://localhost:3000/api/graphql',
  MONGODB: process.env.MONGODB_URI as string
};

export default CONFIG;
