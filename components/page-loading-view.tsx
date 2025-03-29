import React from 'react';
import Loading from '@/components/loading';

const PageLoadingView = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-base-100">
      <Loading />
    </div>
  );
};

export default PageLoadingView;
