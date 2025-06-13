import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Artigo } from '../types/artigo.types';
import * as artigoService from '../services/artigoServices';
import { CardArtigo } from '../components/CardArtigo';

export const PaginaArtigos: React.FC = () =>
{
    const [artigos, setArtigos] = useState<Artigo[]>([]);

    useEffect(() => 
    {
        const artigosCarregados = artigoService.getArtigos();
        setArtigos(artigosCarregados);
    });

    return (
        <div className='conteudoPrincipal'>
            <div>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <h1 className='tituloPagina'> Historia Pokemon </h1>
                    <Link to="/sobre/adicionar" className='btn btn-sucess btn-custom-add-artigo'>
                        + Adicionar Artigo
                    </Link>
                </div>

                <div className='row g-3'>
                    {artigos.length > 0 ? (
                        artigos.map(artigo => (
                            <div key={artigo.id} className='col-md-4 mb-4'>
                                <CardArtigo artigo={artigo}></CardArtigo>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum artigo cadastrado.</p>
                    )}
                </div>
            </div>
        </div>
    )
}