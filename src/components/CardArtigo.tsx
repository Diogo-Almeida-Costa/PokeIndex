import React from 'react';
import {Link} from 'react-router-dom';
import type { Artigo } from '../types/artigo.types';

interface CardArtigoProps
{
    artigo: Artigo;
}

export const CardArtigo: React.FC<CardArtigoProps> = ({ artigo }) =>
{
    return(
        <Link to={`/sobre/${artigo.id}`} className="artigoCard">
            <div className='card h-100'>
                <img src={artigo.imagem} className='card-img-top'></img>
                <div className='card-body'>
                    <h2 className='card-title'>{artigo.titulo}</h2>
                    <p className='card-text'>{artigo.resumo}</p>
                </div>
            </div>
        </Link>
    );
}