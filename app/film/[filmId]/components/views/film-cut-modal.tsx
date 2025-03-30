'use client';

import React from 'react';
import Image from 'next/image';
import { CutSeen } from '@/app/film/[filmId]/types';
import { useCutQuery } from '@/generated/graphql';
import PageErrorView from '@/components/page-error-view';
import Loading from '@/components/loading';

type FilmCutModalProps = {
  filmCutRef: React.RefObject<HTMLDialogElement | null>;
  cutSeen: CutSeen;
};

const FilmCutModal = ({ filmCutRef, cutSeen }: FilmCutModalProps) => {
  const { data, error, loading } = useCutQuery({ variables: { cutId: cutSeen.cutId } });

  const closeCutModal = () => {
    filmCutRef.current?.close();
  };

  return (
    <dialog id="filmCut" className="modal" ref={filmCutRef}>
      <div className="modal-box w-11/12 max-w-7xl">
        <button className="btn btn-sm btn-ghost absolute top-4 right-2" onClick={closeCutModal}>
          <span className="text-2xl">×</span>
        </button>
        {error && <PageErrorView />}
        {loading ? (
          <Loading />
        ) : (
          data?.cut && (
            <>
              <h3 className="text-lg font-extrabold">{data.cut.film?.title}</h3>
              {data.cut?.src && (
                <Image
                  className="rounded-lg mt-4"
                  width={500}
                  height={500}
                  src={data.cut.src!}
                  alt={data.cut.film?.title!}
                  layout="responsive"
                />
              )}
              <div className="modal-action">
                <div className="w-full flex justify-between">
                  <p className="font-bold tex-2xl">{cutSeen.cIdx + 1}번째 사진</p>
                  <div className="flex gap-2">
                    <button className="btn btn-sm btn-outline">❤️</button>
                    <button className="btn btn-sm btn-primary">감상 남기기</button>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </dialog>
  );
};

export default FilmCutModal;
