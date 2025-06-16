import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Artigo } from '../types/artigo.types';
import * as artigoService from '../services/artigoServices.ts';
import { CardArtigo } from '../components/CardArtigo';

export const PaginaArtigos: React.FC = () =>
{
    const [artigos, setArtigos] = useState<Artigo[]>([]);

    useEffect(() => 
    {
        const artigosCarregados = artigoService.getArtigos();
        setArtigos(artigosCarregados);
    }, []);

    return (
        <div className='article-container'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='tituloPagina'> Historia Pokemon </h1>
                <Link to="/sobre/adicionar" className='btn btn-success btn-custom-add-artigo'>
                    + Adicionar Artigo
                </Link>
            </div>

            <div className='article-grid'>
                {artigos.length > 0 ? (
                    artigos.map((artigo) => (
                            <CardArtigo key={artigo.id} artigo={artigo}/>
                    ))
                ) : (
                    <p>Nenhum artigo cadastrado.</p>
                )}
            </div>
        </div>
    );
};