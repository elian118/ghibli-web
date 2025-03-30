'use client';

import React from 'react';
import { CutsQueryVariables, useCutsQuery } from '@/generated/graphql';
import PageErrorView from '@/components/page-error-view';
import Loading from '@/components/loading';

const FilmCuts = ({ filmId }: CutsQueryVariables) => {
  const { data, error, loading } = useCutsQuery({ variables: { filmId } });
  return (
    <div className="my-4">
      {error && <PageErrorView />}
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-6">
          {data?.cuts.map((c, cIdx) => (
            <img className="w-full md:w-[48%] lg:w-[31%] rounded-lg" src={c.src} alt={c.src} key={cIdx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmCuts;
