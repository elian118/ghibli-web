'use client';

import React, { useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType, initModal, ModalState } from '@/global-context';
import { isMobile } from '@/hooks';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const ClientLayer = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>(initModal);

  useEffect(() => {
    if (isMobile()) {
      setIsMobileDevice(true);
    }
  }, []);

  const value: GlobalContextType = {
    isDarkState: [isDark, setIsDark],
    isMobileDeviceState: [isMobileDevice, setIsMobileDevice],
    isOpenMobileMenuState: [isOpenMobileMenu, setIsOpenMobileMenu],
    modalState: [modal, setModal],
  };

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={apolloClient}>
        <div className="mx-auto" data-theme={isDark ? 'dark' : 'light'}>
          {children}
        </div>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
};

export default ClientLayer;
