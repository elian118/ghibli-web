import React from 'react';
import FilmList from '@/app/home/components/film-list';
import CommonLayout from '@/components/common-layout';
import Section from '@/components/section';

const Home = () => {
  return (
    <CommonLayout>
      <div className="h-full py-6 px-4 flex flex-col gap-2 mainContainer">
        <Section title="최고의 명장면을 찾아보세요" />
        <FilmList />
      </div>
    </CommonLayout>
  );
};

export default Home;
