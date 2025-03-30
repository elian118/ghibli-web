'use client';

import React from 'react';
import Loading from '@/components/loading';
import { useFilmsQuery } from '@/generated/graphql';
import { Waypoint } from 'react-waypoint';
import FilmCard from '@/components/film-card';
import PageErrorView from '@/components/page-error-view';

const FilmList = () => {
  const LIMIT = 6;
  const { data, loading, error, fetchMore } = useFilmsQuery({
    variables: {
      limit: LIMIT,
      cursor: 1,
    },
  });

  if (error) return <p>{error.message}</p>;

  return (
    <div className="pageContainer">
      {error && <PageErrorView />}
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-8 my-4">
          {data?.films?.films?.map((film, i) => (
            <div key={film.id}>
              {data?.films.cursor && i === data.films.films.length - LIMIT / 2 && (
                <Waypoint
                  onEnter={() => {
                    fetchMore({
                      variables: {
                        limit: LIMIT,
                        cursor: data.films.cursor,
                      },
                    }).then();
                  }}
                />
              )}
              <FilmCard film={film} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmList;
