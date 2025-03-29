import React from 'react';
import FilmList from '@/app/home/components/film-list';

const Home = () => {
  return (
    <div className="py-8 px-4 flex flex-col gap-2 mainContainer">
      <div className="h-full">
        <FilmList />
      </div>
    </div>
  );
};

export default Home;
