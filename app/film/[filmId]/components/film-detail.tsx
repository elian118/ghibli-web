'use client';

import React from 'react';
import { useFilmQuery } from '@/generated/graphql';
import Loading from '@/app/films/loading';
import PageErrorView from '@/components/page-error-view';
import FilmCard from '@/components/film-card';

type FilmPageProps = {
  filmId: string;
};

const FilmDetail = ({ filmId }: FilmPageProps) => {
  const { data, loading, error } = useFilmQuery({ variables: { filmId: Number(filmId) } });

  return (
    <div className="overflow-scroll">
      {error && <PageErrorView />}
      {loading ? (
        <Loading />
      ) : (
        <div className="flex gap-8 flex-wrap xl:flex-nowrap">
          <div className="min-w-1/4">
            <FilmCard film={data?.film} isHideDetails />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-row gap-2">
              {data?.film?.genre.split(',').map((g, gIdx) => (
                <div key={gIdx} className="badge badge-accent font-bold">
                  {g}
                </div>
              ))}
            </div>
            <p className="font-extrabold text-4xl">{data?.film?.title}</p>
            <p className="font-bold text-3xl">{data?.film?.subtitle}</p>
            <p className="text-2xl">
              {data?.film?.director?.name ?? '(이름 없음)'}﹒{data?.film?.runningTime}
            </p>
            <p className="text-xl">{data?.film?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmDetail;
