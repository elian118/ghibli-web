import React from 'react';
import FilmDetail from '@/app/film/[filmId]/components/views/film-detail';
import FilmCuts from '@/app/film/[filmId]/components/views/film-cuts';

type FilmPageProps = {
  filmId: string;
};

const FilmContainer = ({ filmId }: FilmPageProps) => {
  return (
    <div className="overflow-scroll">
      <FilmDetail filmId={filmId} />
      <FilmCuts filmId={Number(filmId)} />
    </div>
  );
};

export default FilmContainer;
