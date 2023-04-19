import {
  ApolloClient,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import fetch from 'cross-fetch';
import { getOperationAST, GraphQLError } from 'graphql';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { createPubSub } from 'graphql-yoga';
import {
  GET_INSTANCES,
  INSTANCE_UPDATE,
  START_INSTANCE,
  STOP_INSTANCE,
  UPDATE_INSTANCE,
} from '../../../../../constants';
import { SSELink } from '../../../../../helpers';
import { LightInstance } from '../../../../../interfaces';
import { getDomainEnvVariables } from '../../../../../utils';

export const pubSub = createPubSub();

const chainIdToClientMap: { [chainId: number]: ApolloClient<NormalizedCacheObject> } = {};

const subscriptions = [];

getDomainEnvVariables('ARBITRAGE_MANAGER_').forEach(([key, uri]) => {
  if (uri === undefined) throw Error(`Env var ${key} cannot be undefined`);
  const chainId = Number(key.slice('ARBITRAGE_MANAGER_'.length));
  const sseLink = new SSELink({ uri });
  const httpLink = new HttpLink({ uri, fetch });
  const link = split(
    ({ query, operationName }) => {
      const definition = getOperationAST(query, operationName);
      return definition?.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    sseLink,
    httpLink
  );
  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };
  chainIdToClientMap[chainId] = new ApolloClient({
    link,
    defaultOptions,
    cache: new InMemoryCache({ addTypename: false }),
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
    updateInstance: async (
      _: unknown,
      args: { chainId: number; id: string; configuration: LightInstance.Configuration }
    ) => {
      const { chainId, id, configuration } = args;
      const client = chainIdToClientMap[chainId];
      if (!client) return new GraphQLError(`chainId ${chainId} is not supported.`);
      const mutation = UPDATE_INSTANCE;
      const variables = { chainId, id, configuration };
      const { data } = await client.mutate<
        { updateInstance: LightInstance },
        { chainId: number; id: string; configuration: LightInstance.Configuration }
      >({
        mutation,
        variables,
      });
      return data?.updateInstance;
    },
  },
  Subscription: {
    instanceUpdate: {
      subscribe: (_: unknown, args: { chainId: number }) => {
        const { chainId } = args;
        const client = chainIdToClientMap[chainId];
        if (!client) return new GraphQLError(`chainId ${chainId} is not supported.`);
        const query = INSTANCE_UPDATE;
        const variables = { chainId };
        const observer = client.subscribe<{ instanceUpdate: LightInstance }>({ query, variables });
        const subscription = observer.subscribe(({ data }) => {
          if (!data) return;
          pubSub.publish('instanceUpdate', data.instanceUpdate);
        });
        subscriptions.push(subscription);
        return pubSub.subscribe('instanceUpdate');
      },
      resolve: (payload: unknown) => payload,
    },
  },
};
