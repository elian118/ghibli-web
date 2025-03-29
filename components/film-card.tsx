import React from 'react';
import { FilmQuery, FilmsQuery } from '@/generated/graphql';
import Link from 'next/link';

type FilmCardProps = {
  film: FilmsQuery['films']['films'][0] | FilmQuery['film'];
  isHideDetails?: boolean;
};

const FilmCard = ({ film, isHideDetails }: FilmCardProps) => {
  return (
    <Link
      href={`/film/${film?.id}`}
      key={film?.id}
      className={`my-1 card card-sm shadow-sm delay-150 duration-300 ease-in-out ${isHideDetails ? 'pointer-events-none' : 'hover:scale-105'} `}
    >
      <figure className={`${isHideDetails ? 'rounded-lg' : ''}`}>
        <img src={film?.posterImg} alt={film?.title} />
      </figure>
      <div className={`card-body ${isHideDetails ? 'hidden' : ''}`}>
        <h2 className="card-title">{film?.title}</h2>
        <div className="min-h-5 truncate">{film?.subtitle}</div>
      </div>
    </Link>
  );
};

export default FilmCard;
