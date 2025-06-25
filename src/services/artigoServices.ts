import { db } from '../services/firebase.ts';
import { collection, getDocs, addDoc, doc, getDoc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import type { Artigo } from '../types/artigo.types.ts';

const artigosCollectionRef = collection(db, 'artigos');

export const getArtigos = async (): Promise<Artigo[]> =>
{
    const dados = await getDocs(query(artigosCollectionRef, orderBy('titulo')));

    const artigos = dados.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    })) as Artigo[];
    return artigos;
}

export const addArtigo = async(dados: Omit<Artigo, 'id'>): Promise<string> =>
{
    const novoArtigo = await addDoc(artigosCollectionRef, dados);
    return novoArtigo.id;
}

export const searchArtigo = async(id: string): Promise<Artigo | undefined> =>
{
    const artigo = doc(db, 'artigos', id);
    const busca = await getDoc(artigo);

    if(busca.exists())
    {
        return {...busca.data(), id: busca.id} as Artigo;
    }
    return undefined;
} 

export const deleteArtigo = async(id: string): Promise<void> =>
{
    const artigo = doc(db, 'artigos', id);
    await deleteDoc(artigo);
}

export const atualizarArtigo = async(artigoAtualizado: Artigo): Promise<void> =>
{
    const artigos = doc(db, 'artigos', artigoAtualizado.id);

    const dadosAtualizar = {...artigoAtualizado};
    delete (dadosAtualizar as Partial<Artigo>).id;

    await updateDoc(artigos, dadosAtualizar);
}