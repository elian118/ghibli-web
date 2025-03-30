'use client';

import React from 'react';
import Image from 'next/image';
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
            <div key={cIdx} className="w-full md:w-[48%] lg:w-[31%]">
              <Image className="rounded-lg" src={c.src} alt={c.src} width={500} height={300} layout="responsive" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilmCuts;
