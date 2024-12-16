import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { env } from "process";

const httpLink = createHttpLink({
  uri: env.HYGRAPH_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = env.HYGRAPH_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

let client: ApolloClient<unknown> | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }
  return client;
};
