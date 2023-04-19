import { useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
  DefaultOptions,
} from '@apollo/client';
import { getOperationAST } from 'graphql';
import { SSELink } from '../helpers';

// eslint-disable-next-line prefer-destructuring
const NEXT_PUBLIC_GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

if (NEXT_PUBLIC_GRAPHQL_API_URL === undefined) {
  throw Error('Missing NEXT_PUBLIC_GRAPHQL_API_URL in .env file');
}

const uri = NEXT_PUBLIC_GRAPHQL_API_URL;

const sseLink = new SSELink({ uri });
const httpLink = new HttpLink({ uri });

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

const client = new ApolloClient({
  link,
  defaultOptions,
  cache: new InMemoryCache({ addTypename: false }),
});

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
            <Notifications />
          </ApolloProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
