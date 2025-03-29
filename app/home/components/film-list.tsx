'use client';

import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Loading from '@/components/loading';

const FILM_LIST = gql`
  query FilmList {
    films {
      id
      title
      subtitle
    }
  }
`;

const FilmList = () => {
  const { data, loading, error } = useQuery(FILM_LIST);

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
