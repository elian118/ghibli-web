'use client';

import React from 'react';
import Loading from '@/components/loading';
import { useFilmsQuery } from '@/generated/graphql';

const FilmList = () => {
  const { data, loading, error } = useFilmsQuery();

  if (error) return <p>{error.message}</p>;

  return (
    <div className="max-h-full overflow-y-scroll">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {data?.films?.map((film) => (
            <div key={film.id} className="card shadow-sm">
              <figure>
                <img src={film.posterImg} alt={film.title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{film.title}</h2>
                <div>{film.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmList;
