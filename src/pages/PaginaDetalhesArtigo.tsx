import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type {Artigo} from '../types/artigo.types';
import * as artigoServices from '../services/artigoServices';

export const PaginaDetalhesArtigo: React.FC = () =>
{
    const { artigoId } = useParams<{ artigoId: string }>();
    const navigate = useNavigate();
    const [artigo, setArtigo] = useState<Artigo | null>(null);

    useEffect(() =>
    {
        if(artigoId)
        {
            const fetchArtigo = async () =>
            {
                const artigoEncontrado = await artigoServices.searchArtigo(artigoId);
                if(artigoEncontrado)
                {
                    setArtigo(artigoEncontrado);
                }
                else
                {
                    alert("Artigo não encontrado");
                    navigate('/sobre');
                }
            };
            fetchArtigo();
        }
    }, [artigoId, navigate]);

    const handleDelete = async () => 
    {
        if(artigo && window.confirm(`Deseja mesmo excluir "${artigo.titulo} "?`))
        {
            try
            {
                artigoServices.deleteArtigo(artigo.id);
                alert("Artigo excluido");
                navigate("/sobre");
            }
            catch(error)
            {
                console.log("Erro para excluir artigo", error);
                alert("Falha para excluir artigo");
            }
        }
    };

    if(!artigo)
    {
        return <p className="text-center text-white mt-5 fs-4"> Carregando artigo... </p>
    }

    return(
        <div className='article-detail-container'>
            <img src={artigo.imagem} className='article-detail-image'/>
            <h1 className='article-detail-title'> {artigo.titulo} </h1>
            <div className='article-detail-content'>
                <p> {artigo.conteudo} </p>
            </div>
            <div className='article-detail-actions mt-4'>
                <Link to={`/sobre/editar/${artigo.id}`} className="btn btn-secondary me-2"> Editar </Link>
                <button onClick={handleDelete} className="btn btn-outline-secondary ms-auto"> Excluir </button>
            </div>
        </div>
    );
};