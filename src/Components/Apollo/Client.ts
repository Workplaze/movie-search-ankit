import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
    link: new HttpLink({
      uri: "https://unified-mongoose-24.hasura.app/v1/graphql",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          "qWOMPyfCKfqS7ImQe396dVEMAitruDjGvoHwWFXe4TBqmlOpy7ctsYT7dehBi5FH",
      },
    }),
    cache: new InMemoryCache(),
  });

  export default Client;