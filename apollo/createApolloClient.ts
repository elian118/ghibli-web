import { ApolloClient, from, fromPromise, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createApolloCache } from '@/apollo/createApolloCache';
import { setContext } from '@apollo/client/link/context';
import LocalStorage from '@/utils/LocalStorage';
import { refreshAccessToken } from '@/apollo/auth';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    if (graphQLErrors.find((err) => err.message === 'access token expired')) {
      console.log('refreshAccessToken');
      // onError 콜백은 async 사용 불가 ➝ fromPromise 대신 사용
      return fromPromise(refreshAccessToken(apolloClient, operation))
        .filter((result) => !!result)
        .flatMap(() => forward(operation));
    }

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
  credentials: 'include', // CORS 자격증명 모드 → 'include' 설정
});

const authLink = setContext((request, prevContext) => {
  const accessToken = LocalStorage.getItem('accessToken');

  return {
    headers: {
      ...prevContext.header,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  apolloClient = new ApolloClient({
    cache: createApolloCache(),
    uri: 'http://localhost:4000/graphql',
    link: from([authLink, errorLink, httpLink]),
  });
  return apolloClient;
};
