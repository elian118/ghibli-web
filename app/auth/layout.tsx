import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원 가입',
  description: '환영합니다!',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-base-200">{children}</div>;
};

export default AuthLayout;
