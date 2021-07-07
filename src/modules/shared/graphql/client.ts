import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { authLink, errorsLink } from "./links";

const httpLink = createHttpLink({
  uri: process.env.AIRCALL_GQL_URL || "https://frontend-test-api.aircall.io/graphql",
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(from([errorsLink, httpLink])),
  cache: new InMemoryCache(),
});
