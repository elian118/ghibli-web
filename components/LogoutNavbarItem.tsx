'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const LogoutNavbarItem = () => {
  const pathname = usePathname();
  const isCurrentPage = (path: any) => {
    return pathname.split('/')[1] === path.replace('/', '') ? 'font-bold' : '';
  };

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <span className={isCurrentPage('/auth')}>로그인</span>
      </Link>
      <Link href="/auth">
        <span className={isCurrentPage('/auth')}>시작하기</span>
      </Link>
    </div>
  );
};

export default LogoutNavbarItem;
