import React from 'react';
import { MeQuery } from '@/generated/graphql';

type LoggedInNavbarItemProps = {
  data?: MeQuery;
};

const LoggedInNavbarItem = ({ data }: LoggedInNavbarItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="avatar avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-8 rounded-full">
          <span className="text-xs font-bold">{data?.me?.username.charAt(0).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default LoggedInNavbarItem;
