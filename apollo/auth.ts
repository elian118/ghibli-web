import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { Operation } from '@apollo/client';
import LocalStorage from '@/utils/LocalStorage';
import { RefreshAccessTokenDocument, RefreshAccessTokenMutation } from '@/generated/graphql';

export const refreshAccessToken = (
  _apolloClient: ApolloClient<NormalizedCacheObject>,
  operation: Operation,
): Promise<boolean> => {
  console.log('refresh token expired');
  console.log(_apolloClient);
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
