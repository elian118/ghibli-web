import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '목록',
  description: '목록을 조회합니다.',
};

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default HomeLayout;
