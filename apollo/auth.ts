'use client';

import { ApolloClient, NormalizedCacheObject, Operation } from '@apollo/client';
import { RefreshAccessTokenDocument, RefreshAccessTokenMutation } from '@/generated/graphql';
import LocalStorage from '@/utils/LocalStorage';

export const refreshAccessToken = async (
  _apolloClient: ApolloClient<NormalizedCacheObject>,
  operation: Operation,
): Promise<boolean> => {
  return _apolloClient
    ?.mutate<RefreshAccessTokenMutation>({
      mutation: RefreshAccessTokenDocument,
    })
    .then(({ data }) => {
      const newAccessToken = data?.refreshAccessToken?.accessToken;
      if (!newAccessToken) {
        LocalStorage.setItem('accessToken', '');
        return false;
      }
      LocalStorage.setItem('accessToken', newAccessToken);
      const prevContext = operation.getContext();
      operation.setContext({
        headers: {
          ...prevContext.headers,
          authorization: `Bearer ${newAccessToken}`,
        },
      });
      return true;
    })
    .catch(() => {
      LocalStorage.setItem('accessToken', '');
      return false;
    });
};
