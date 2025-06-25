import { Pokemon } from './Pokemon.types';

export interface TimePokemon {
  id?: string; 
  nome: string;
  pokemons: Pokemon[];
}