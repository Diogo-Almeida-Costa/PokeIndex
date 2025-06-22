import axios from 'axios';
import { Pokemon } from '../types/Pokemon.types';

const mapearPokemon = async (url: string): Promise<Pokemon> => {
  const res = await axios.get(url);
  const especieRes = await axios.get(res.data.species.url);

  const data = res.data;
  const descricaoObj = especieRes.data.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'pt' || entry.language.name === 'en'
  );

  return {
    id: data.id,
    nome: data.name,
    tipo1: data.types[0].type.name,
    tipo2: data.types[1]?.type.name,
    altura: data.height / 10,
    peso: data.weight / 10,
    habilidades: data.abilities.map((a: any) => a.ability.name),
    descricao: descricaoObj?.flavor_text.replace(/\f/g, ' ') || 'Descrição indisponível',
    imagemUrl: data.sprites.other['official-artwork'].front_default
  };
};

export const buscarListaDePokemons = async (limit = 20, offset = 0): 

Promise<Pokemon[]> => {
  const listaRes = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const resultados = listaRes.data.results;

  const pokemons = await Promise.all(
    resultados.map((poke: any) => mapearPokemon(poke.url))
  );

  return pokemons;
};
