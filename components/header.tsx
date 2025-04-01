'use client';

import React, { useContext, useMemo } from 'react';
import Link from 'next/link';
import LogoutNavbarItem from '@/components/LogoutNavbarItem';
import { useMeQuery } from '@/generated/graphql';
import LoggedInNavbarItem from '@/components/logged-in-navbar-item';
import { GlobalContext } from '@/global-context';

const Header = () => {
  const { accessTokenState } = useContext(GlobalContext);
  const [accessToken] = accessTokenState;
  const { data } = useMeQuery({ skip: !accessToken });
  const isLoggedIn = useMemo(() => {
    if (accessToken) return data?.me?.id;
    return false;
  }, [accessToken, data?.me?.id]);

  return (
    <div className="h-14 px-8 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link className="text-3xl font-extrabold" href="/films">
          GhibliBestCut
        </Link>
      </div>
      {!isLoggedIn ? <LogoutNavbarItem /> : <LoggedInNavbarItem />}
    </div>
  );
};

export default Header;
