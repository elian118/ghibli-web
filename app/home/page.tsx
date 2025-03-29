import React from 'react';
import FilmList from '@/app/home/components/film-list';

const Home = () => {
  return (
    <div className="p-4 flex flex-col gap-2 mainContainer">
      <div className="flex items-center justify-between gap-2 w-full">Ghibli GraphQL</div>
      <div className="h-full">
        <FilmList />
      </div>
    </div>
  );
};

export default Home;
