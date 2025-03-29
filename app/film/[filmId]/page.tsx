import React from 'react';
import CommonLayout from '@/components/common-layout';
import Section from '@/components/section';
import FilmDetail from '@/app/film/[filmId]/components/film-detail';

const Film = async ({ params }: { params: Promise<{ filmId: string }> }) => {
  const { filmId } = await params;
  return (
    <CommonLayout>
      <div className="h-full py-6 px-4 flex flex-col gap-2 mainContainer">
        <Section title="영화 개별 상세 정보 페이지" />
        <FilmDetail filmId={filmId} />
      </div>
    </CommonLayout>
  );
};

export default Film;
