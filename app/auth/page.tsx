import React from 'react';
import CommonLayout from '@/components/common-layout';
import SignUpInput from '@/app/auth/components/sign-up-input';

const Auth = () => {
  return (
    <CommonLayout>
      <div className="h-full py-6 px-4 flex flex-col gap-2 mainContainer">
        {/*<Section title="계정 생성" />*/}
        <div className="h-full flex flex-col justify-center items-center gap-6">
          <p className="text-5xl font-extrabold">계정 생성</p>
          <p className="text-2xl font-bold">환영합니다.</p>
          <SignUpInput />
        </div>
      </div>
    </CommonLayout>
  );
};

export default Auth;
