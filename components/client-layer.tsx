'use client';

import React, { useEffect } from 'react';
import { isMobile } from '@/hooks';
import { ApolloProvider } from '@apollo/client';
import ToastContainer from '@/components/toast-container';
import { createApolloClient } from '@/apollo/createApolloClient';
import { useRouter } from 'next/navigation';
import { useGlobalStore } from '@/global-store';
import LocalStorage from '@/utils/LocalStorage';

const apolloClient = createApolloClient();

const ClientLayer = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { setIsMobileDevice, setAccessToken, isDark } = useGlobalStore();

  useEffect(() => {
    if (isMobile()) setIsMobileDevice(true);
    const accessToken = LocalStorage.getItem('accessToken');
    !!accessToken ? setAccessToken(accessToken) : router.push('/login');
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <div className="mx-auto" data-theme={isDark ? 'dark' : 'light'}>
        {children}
        <ToastContainer />
      </div>
    </ApolloProvider>
  );
};

export default ClientLayer;
