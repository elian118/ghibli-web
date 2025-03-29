import React from 'react';

type CommonLayoutProps = {
  children: React.ReactNode;
  bg?: string;
};

const CommonLayout = ({ children }: CommonLayoutProps) => {
  return <div className="px-1 mx-auto w-full md:max-w-10/12 xl:max-w-9/12 min-h-full">{children}</div>;
};

export default CommonLayout;
