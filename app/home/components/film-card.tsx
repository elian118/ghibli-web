import React from 'react';
import { FilmsQuery } from '@/generated/graphql';

type FilmCardProps = {
  film: FilmsQuery['films']['films'][0];
};

const FilmCard = ({ film }: FilmCardProps) => {
  return (
    <div key={film.id} className="my-1 card shadow-sm delay-150 duration-300 ease-in-out hover:scale-105">
      <figure>
        <img src={film.posterImg} alt={film.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{film.title}</h2>
        <div className="min-h-5 truncate">{film.subtitle}</div>
      </div>
    </div>
  );
};

export default FilmCard;
