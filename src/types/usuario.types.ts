import type { TimePokemon } from './timePokemon.types';
import type { Artigo } from '../types/artigo.types';

export interface Usuario 
{
  id: number;
  nome: string;
  senha: string;
  timesPokemons: TimePokemon[];
  artigosCadastradas: Artigo[];
}