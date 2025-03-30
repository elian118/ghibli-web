import { onError } from '@apollo/client/link/error';
import { ApolloClient, from, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { createApolloCache } from '@/apollo/createApolloCache';
import { setContext } from '@apollo/client/link/context';
import LocalStorage from '@/utils/LocalStorage';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL Error]: → ${operation.operationName}
        Message: ${message}, Query: ${path}, Location: ${JSON.stringify(locations)}`,
      );
    });
  }

  if (networkError) {
    console.log(
      `[Network Error]: → ${operation.operationName}
      Message: ${networkError.message}]`,
    );
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, prevContext) => {
  const accessToken = LocalStorage.getItem('accessToken');

  return {
    headers: {
      ...prevContext.header,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    cache: createApolloCache(),
    uri: 'http://localhost:4000/graphql',
    link: from([authLink, errorLink, httpLink]),
  });
