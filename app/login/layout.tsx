import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '지브리 명장면 프로젝트 | 감상평과 좋아요를 눌러보세요!',
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-base-200">{children}</div>;
};

export default LoginLayout;
