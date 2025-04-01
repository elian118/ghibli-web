'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { CutSeen } from '@/app/film/[filmId]/types';
import {
  CutDocument,
  CutQuery,
  CutQueryVariables,
  useCutQuery,
  useMeQuery,
  useVoteMutation,
} from '@/generated/graphql';
import PageErrorView from '@/components/page-error-view';
import Loading from '@/components/loading';
import Btn from '@/components/btn';
import { useToast } from '@/hooks';
import { useGlobalStore } from '@/global-store';

type FilmCutModalProps = {
  filmCutRef: React.RefObject<HTMLDialogElement | null>;
  cutSeen: CutSeen;
};

const FilmCutModal = ({ filmCutRef, cutSeen }: FilmCutModalProps) => {
  const { accessToken } = useGlobalStore();
  const { cutId } = cutSeen;
  const { data, error, loading } = useCutQuery({ variables: { cutId: cutId } });
  const { data: userData } = useMeQuery({ skip: !accessToken });
  const { toast } = useToast();
  const isLoggedIn = useMemo(() => {
    if (accessToken) return userData?.me?.id;
    return false;
  }, [accessToken, userData?.me?.id]);

  const [vote, { loading: voteLoading }] = useVoteMutation({
    variables: { cutId: cutId },
    update: (cache, fetchResult) => {
      // 'cut' Query 조회
      const currentCut = cache.readQuery<CutQuery, CutQueryVariables>({
        query: CutDocument,
        variables: { cutId },
      });
      if (currentCut && currentCut.cut) {
        if (fetchResult.data?.vote) {
          // 'cut' Query 데이터 재설정
          cache.writeQuery<CutQuery, CutQueryVariables>({
            query: CutDocument,
            variables: { cutId: currentCut.cut.id },
            data: {
              __typename: 'Query',
              ...currentCut,
              cut: {
                ...currentCut.cut,
                votesCount: data?.cut?.isVoted ? currentCut.cut.votesCount - 1 : currentCut.cut.votesCount + 1,
                isVoted: !data?.cut?.isVoted,
              },
            },
          });
        }
      }
    },
  });

  const closeCutModal = () => filmCutRef.current?.close();

  const onClickLike = async () => {
    isLoggedIn
      ? await vote()
      : toast({
          status: 'alert-warning',
          title: '좋아요 표시는 로그인한 이후 가능합니다.',
        });
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
                    <Btn
                      isLoading={voteLoading}
                      className={`btn btn-sm ${data?.cut?.isVoted ? 'btn-secondary' : 'btn-base'}`}
                      onClick={onClickLike}
                    >
                      ❤️ {data?.cut?.votesCount}
                    </Btn>
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
