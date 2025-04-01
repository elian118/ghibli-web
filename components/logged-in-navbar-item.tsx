'use client';

import React, { useMemo } from 'react';
import { useLogoutMutation, useMeQuery } from '@/generated/graphql';
import { useApolloClient } from '@apollo/client';
import LocalStorage from '@/utils/LocalStorage';
import { useRouter } from 'next/navigation';
import Btn from '@/components/btn';
import { useGlobalStore } from '@/global-store';

const LoggedInNavbarItem = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const { accessToken, setAccessToken } = useGlobalStore();
  const { data } = useMeQuery({ skip: !accessToken });
  const username = useMemo(() => {
    if (data?.me?.username) {
      return `${process.env.REACT_APP_API_HOST}/${data?.me?.username}`;
    }
    return '';
  }, [data]);

  const onLogoutClick = async () => {
    try {
      await logout();
      router.push('/login');
      LocalStorage.removeItem('accessToken');
      setAccessToken(null);
      await client.resetStore(); // 아폴로 클라이언트 캐시 초기화
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-xs font-bold">{username.charAt(0).toUpperCase()}</span>
          </div>
        </div>
        <ul tabIndex={0} className="dropdown-content menu z-1 w-20 p-2 rounded-box bg-base shadow-md">
          <li onClick={onLogoutClick}>
            <Btn type="button" className="btn-ghost" isLoading={logoutLoading}>
              Logout
            </Btn>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoggedInNavbarItem;
