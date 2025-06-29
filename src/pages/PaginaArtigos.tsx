import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Artigo } from '../types/artigo.types';
import * as artigoService from '../services/artigoServices.ts';
import { CardArtigo } from '../components/CardArtigo';

export const PaginaArtigos: React.FC = () =>
{
    const [artigos, setArtigos] = useState<Artigo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => 
    {
        const fetchArtigos = async () =>
        {
            try
            {
                const artigosCarregados = await artigoService.getArtigos();
                setArtigos(artigosCarregados);
            }
            catch(error)
            {
                console.error("Erro ao encontrar artigos", error);
                alert("Erro para carregar artigos");
            }
            finally
            {
                setLoading(false);
            }
        };

        fetchArtigos();
    }, []);

    if(loading)
    {
        return <p className="text-center text-white mt-5 fs-4"> Carregando Artigos </p>
    }

    return (
        <div className='article-page-container'>
        <div className="article-page-header">
            <h1 className='page-title'>História Pokémon</h1>
        </div>

        <div className='article-grid'>
            {artigos.length > 0 ? (
            artigos.map((artigo) => (
                <CardArtigo key={artigo.id} artigo={artigo} />
            ))
            ) : (
            <p className="text-center w-100 text-black-50 mt-5 fs-5">Nenhum artigo registado. Seja o primeiro a criar!</p>
            )}
        </div>

        <Link to="/sobre/adicionar" className='add-btn'>
            +
        </Link>
        </div>
    );
};