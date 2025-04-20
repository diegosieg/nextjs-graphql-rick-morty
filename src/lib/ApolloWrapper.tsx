"use client";

import { API_URI } from "@/constants/api";
import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

const httpLink = new HttpLink({
  uri: API_URI,
});

const makeClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
