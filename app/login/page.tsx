import React from 'react';
import CommonLayout from '@/components/common-layout';
import LoginInput from '@/app/login/components/login-input';

const Login = () => {
  return (
    <CommonLayout>
      <div className="h-full py-6 px-4 flex flex-col gap-2 mainContainer">
        {/*<Section title="계정 생성" />*/}
        <div className="h-full flex flex-col justify-center items-center gap-6">
          <p className="text-5xl font-extrabold">지브리 명장면 프로젝트</p>
          <p className="text-2xl font-bold">감상평과 좋아요를 눌러보세요!</p>
          <LoginInput />
        </div>
      </div>
    </CommonLayout>
  );
};

export default Login;
