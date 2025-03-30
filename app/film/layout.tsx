import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상세조회',
  description: '개별 영화 페이지입니다',
};

const FilmLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-base-200">{children}</div>;
};

export default FilmLayout;
