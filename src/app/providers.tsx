"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@/hooks/useUser";
import { ApolloWrapper } from "../lib/ApolloWrapper";

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ApolloWrapper>
      <CacheProvider>
        <ChakraProvider>
          <UserProvider>{children}</UserProvider>
        </ChakraProvider>
      </CacheProvider>
    </ApolloWrapper>
  );
}
