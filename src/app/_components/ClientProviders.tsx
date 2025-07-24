"use client";
import { ApolloProvider } from "@apollo/client";
import client from "../../lib/apollo-client";
import { BagProvider } from "./bag-context";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <BagProvider>
        {children}
      </BagProvider>
    </ApolloProvider>
  );
} 