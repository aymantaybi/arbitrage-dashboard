import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';
import { GraphQLError } from 'graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { GET_INSTANCES, START_INSTANCE, STOP_INSTANCE } from '../../../../../constants';
import { LightInstance } from '../../../../../interfaces';
import { getDomainEnvVariables } from '../../../../../utils';

const chainIdToClientMap: { [chainId: number]: ApolloClient<NormalizedCacheObject> } = {};

getDomainEnvVariables('ARBITRAGE_MANAGER_').forEach(([key, uri]) => {
  const chainId = Number(key.slice('ARBITRAGE_MANAGER_'.length));
  const httpLink = new HttpLink({ uri, fetch });
  chainIdToClientMap[chainId] = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
});

export const resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    instances: async (_: unknown, args: { chainId: number }) => {
      const { chainId } = args;
      const client = chainIdToClientMap[chainId];
      if (!client) return new GraphQLError(`chainId ${chainId} is not supported.`);
      const query = GET_INSTANCES;
      const variables = { chainId };
      const {
        data: { instances },
      } = await client.query<{ instances: LightInstance[] }>({ query, variables });
      return instances;
    },
  },
  Mutation: {
    createInstance: () => {},
    startInstance: async (_: unknown, args: { chainId: number; id: string }) => {
      const { chainId, id } = args;
      const client = chainIdToClientMap[chainId];
      if (!client) return new GraphQLError(`chainId ${chainId} is not supported.`);
      const mutation = START_INSTANCE;
      const variables = { chainId, id };
      const { data } = await client.mutate<
        { startInstance: LightInstance },
        { chainId: number; id: string }
      >({
        mutation,
        variables,
      });
      return data?.startInstance;
    },
    stopInstance: async (_: unknown, args: { chainId: number; id: string }) => {
      const { chainId, id } = args;
      const client = chainIdToClientMap[chainId];
      if (!client) return new GraphQLError(`chainId ${chainId} is not supported.`);
      const mutation = STOP_INSTANCE;
      const variables = { chainId, id };
      const { data } = await client.mutate<
        { stopInstance: LightInstance },
        { chainId: number; id: string }
      >({
        mutation,
        variables,
      });
      return data?.stopInstance;
    },
  },
};
