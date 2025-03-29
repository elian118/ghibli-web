'use client';

import React from 'react';
import Loading from '@/components/loading';
import { useFilmsQuery } from '@/generated/graphql';

const FilmList = () => {
  const { data, loading, error } = useFilmsQuery();

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;

  // const [films, setFilms] = useState<Film[]>([]);

  // useEffect(() => setFilms(data.films), []);

  return (
    <div className="h-9/12">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/*{films?.map((film) => (*/}
      {/*  <div key={film.id}>*/}
      {/*    <div>{film.id}</div>*/}
      {/*    <div>{film.title}</div>*/}
      {/*    <div>{film.subtitle}</div>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  );
};

export default FilmList;
