import type { Artigo } from '../types/artigo.types.ts';

const ARTIGOS = 'artigos';

export const getArtigos = (): Artigo[] =>
{
    const dados = localStorage.getItem(ARTIGOS);

    return dados ? JSON.parse(dados) : [];
}

export const addArtigo = (dados: Omit<Artigo, 'id'>): Artigo =>
{
    const artigos = getArtigos();

    const novoArtigo: Artigo =
    {
        id: crypto.randomUUID(),
        ...dados,
    };

    artigos.push(novoArtigo);
    localStorage.setItem(ARTIGOS, JSON.stringify(artigos));
    return novoArtigo;
}

export const searchArtigo = (id: string): Artigo | undefined =>
{
    const artigos = getArtigos();
    return artigos.find(artigo => artigo.id === id);
} 

export const deleteArtigo = (id: string): void =>
{
    const artigosAtualizados = getArtigos().filter(artigo => artigo.id !== id);

    localStorage.setItem(ARTIGOS, JSON.stringify(artigosAtualizados));
}

export const atualizarArtigo = (artigoAtualizado: Artigo): Artigo | undefined =>
{
    const artigos = getArtigos();
    const indiceArtigo = artigos.findIndex(artigo => artigo.id === artigoAtualizado.id);

    if(indiceArtigo !== -1)
    {
        artigos[indiceArtigo] = artigoAtualizado;
        localStorage.setItem(ARTIGOS, JSON.stringify(artigos));
        return artigoAtualizado;
    }

    return undefined;
}