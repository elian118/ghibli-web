'use client';

import React from 'react';
import { useFilmQuery } from '@/generated/graphql';
import Loading from '@/app/films/loading';

type FilmPageProps = {
  filmId: string;
};

const FilmDetail = ({ filmId }: FilmPageProps) => {
  const { data, loading, error } = useFilmQuery({ variables: { filmId: Number(filmId) } });

  return (
    <div>
      {error && <p>페이지를 표시할 수 없습니다.</p>}
      {loading ? <Loading /> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default FilmDetail;
