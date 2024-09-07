import { Query, QueryResponse } from "shared-types";
import { providersJSON } from "./constants";

export interface Provider {
  endpoint: string;
  getHotels: (query: Query) => Promise<QueryResponse>;
}

const providers: Provider[] = [];

for (const provider of providersJSON) {
  providers.push({
    endpoint: provider.endpoint,
    getHotels: async (query: Query) => {
      console.log("Fetching hotels from:", { name: provider.name, query });
      const response = await fetch(provider.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      return data as QueryResponse;
    },
  });
}

export const getAllHotels = (query: Query) => {
  return Promise.allSettled(
    providers.map((provider) => provider.getHotels(query))
  );
};

export default providers;
