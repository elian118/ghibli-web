import React from 'react';
import Image from 'next/image';
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
      className={`my-1 card card-sm shadow-sm transition-transform duration-150 ease-in-out ${isHideDetails ? 'pointer-events-none' : 'hover:scale-105'} `}
    >
      <figure className={`${isHideDetails ? 'rounded-lg' : ''}`}>
        <Image width={500} height={300} src={film?.posterImg!} alt={film?.title!} layout="responsive" />
      </figure>
      <div className={`card-body ${isHideDetails ? 'hidden' : ''}`}>
        <h2 className="card-title">{film?.title}</h2>
        <div className="min-h-5 truncate">{film?.subtitle}</div>
      </div>
    </Link>
  );
};

export default FilmCard;
