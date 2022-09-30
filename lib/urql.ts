import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "urql";

const url =
  "https://api-sa-east-1.hygraph.com/v2/cl88wsb7n1nv801umfyfyfm35/master";
const queryKey = process.env.QUERY_KEY || "";
const mutationKey = process.env.MUTATION_KEY || "";
const isServerSide = typeof window === "undefined";
const ssrCache = ssrExchange({ isClient: !isServerSide });

const clientQuery = createClient({
  url,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${queryKey}`,
    },
  },
});

const clientMutation = createClient({
  url: url,
  exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
  requestPolicy: "network-only",
  fetchOptions: {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${mutationKey}`,
    },
  },
});

export { clientQuery, ssrCache, clientMutation };
