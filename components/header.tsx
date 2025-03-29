'use client';

import React from 'react';
import { menus } from '@/consts/menus';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const isCurrentPage = (path: any) => {
    return pathname.split('/')[1] === path.replace('/', '') ? 'font-bold' : '';
  };

  return (
    <div className="h-14 px-4 flex items-center gap-2">
      {menus
        .filter((x) => !x.isHide)
        .map((m) => (
          <Link key={m.link} href={m.link}>
            <span className={isCurrentPage(m.link)}>{m.name}</span>
          </Link>
        ))}
    </div>
  );
};

export default Header;
