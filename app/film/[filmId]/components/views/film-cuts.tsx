'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { CutsQueryVariables, useCutsQuery } from '@/generated/graphql';
import PageErrorView from '@/components/page-error-view';
import Loading from '@/components/loading';
import FilmCutModal from '@/app/film/[filmId]/components/views/film-cut-modal';
import { CutSeen } from '@/app/film/[filmId]/types';

const FilmCuts = ({ filmId }: CutsQueryVariables) => {
  const { data, error, loading } = useCutsQuery({ variables: { filmId } });
  const [cutSeen, setCutSeen] = useState<CutSeen>({ cutId: 0, cIdx: 0 });
  const filmCutRef = useRef<HTMLDialogElement>(null);

  const openCutModal = (cutSeen: CutSeen) => {
    setCutSeen((prev) => (prev !== cutSeen ? cutSeen : prev));
    filmCutRef.current?.showModal();
  };

  return (
    <div className="my-4">
      {error && <PageErrorView />}
      {loading ? (
        <Loading />
      ) : (
        data && (
          <div className="flex justify-center flex-wrap gap-6">
            {data?.cuts.map((c, cIdx) => (
              <div
                key={cIdx}
                className="w-full md:w-[48%] lg:w-[31.5%] transition-transform duration-150 ease-in-out hover:scale-105 cursor-pointer"
                onClick={() => openCutModal({ cutId: c.id, cIdx })}
              >
                <Image className="rounded-lg" src={c.src} alt={c.src} width={500} height={300} layout="responsive" />
              </div>
            ))}
            <FilmCutModal filmCutRef={filmCutRef} cutSeen={cutSeen} />
          </div>
        )
      )}
    </div>
  );
};

export default FilmCuts;
