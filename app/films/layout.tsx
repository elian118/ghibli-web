import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '목록',
  description: '최고의 명장면을 찾아보세요!',
};

const FilmsLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default FilmsLayout;
