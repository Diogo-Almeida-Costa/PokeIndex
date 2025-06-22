import React, { useEffect, useState } from 'react';
import { buscarListaDePokemons } from '../services/pokeApi.service';
import { Pokemon } from '../types/Pokemon.types';
import '../style/pokedex.css';

const regioes = [
  { nome: 'Kanto', limit: 151, offset: 0 },
  { nome: 'Johto', limit: 100, offset: 151 },
  { nome: 'Hoenn', limit: 135, offset: 251 },
  { nome: 'Sinnoh', limit: 107, offset: 386 },
  { nome: 'Unova', limit: 156, offset: 493 },
  { nome: 'Kalos', limit: 72, offset: 649 },
  { nome: 'Alola', limit: 88, offset: 721 },
  { nome: 'Galar', limit: 89, offset: 809 },
  { nome: 'Paldea', limit: 112, offset: 898 }
];

const mapaDeCores: Record<string, string> = {
  normal: 'var(--cor-normal)',
  fire: 'var(--cor-fogo)',
  water: 'var(--cor-agua)',
  electric: 'var(--cor-eletrico)',
  grass: 'var(--cor-planta)',
  ice: 'var(--cor-gelo)',
  fighting: 'var(--cor-lutador)',
  poison: 'var(--cor-veneno)',
  ground: 'var(--cor-terrestre)',
  flying: 'var(--cor-voador)',
  psychic: 'var(--cor-psiquico)',
  bug: 'var(--cor-inseto)',
  rock: 'var(--cor-pedra)',
  ghost: 'var(--cor-fantasma)',
  dragon: 'var(--cor-dragao)',
  dark: 'var(--cor-sombrio)',
  steel: 'var(--cor-aco)',
  fairy: 'var(--cor-fada)'
};

export const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState('Kanto');
  const [regiaoEmCarregamento, setRegiaoEmCarregamento] = useState<string | null>(null);

  const carregarPokemonsDaRegiao = async (limit: number, offset: number, nomeRegiao: string) => {
    setRegiaoEmCarregamento(nomeRegiao);
    setCarregando(true);
    setRegiaoSelecionada(nomeRegiao);
    try {
      const dados = await buscarListaDePokemons(limit, offset);
      setPokemons(dados);
      setErro(null);
    } catch {
      setErro('Erro ao carregar os pokémons');
    } finally {
      setCarregando(false);
      setRegiaoEmCarregamento(null);
    }
  };

  useEffect(() => {
    const regiao = regioes.find(r => r.nome === regiaoSelecionada);
    if (regiao) {
      carregarPokemonsDaRegiao(regiao.limit, regiao.offset, regiao.nome);
    }
  }, [regiaoSelecionada]);

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title">Pokédex de {regiaoSelecionada}</h2>

      <div className="text-center mb-4">
        {regioes.map(regiao => (
          <button
            key={regiao.nome}
            className={`regiao-btn ${regiaoSelecionada === regiao.nome ? 'active' : ''}`}
            onClick={() => carregarPokemonsDaRegiao(regiao.limit, regiao.offset, regiao.nome)}
            disabled={carregando && regiaoEmCarregamento === regiao.nome}
          >
            {carregando && regiaoEmCarregamento === regiao.nome ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              regiao.nome
            )}
          </button>
        ))}
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-danger">{erro}</p>}

      <div className="row">
        {pokemons.map(pokemon => (
          <div className="col-md-4 mb-4" key={pokemon.id}>
            <div
              className="pokemon-card"
              style={{
                background: pokemon.tipo2
                  ? `linear-gradient(to bottom, ${mapaDeCores[pokemon.tipo1]} 0%, ${mapaDeCores[pokemon.tipo1]} 50%, ${mapaDeCores[pokemon.tipo2]} 100%)`
                  : `linear-gradient(to bottom, ${mapaDeCores[pokemon.tipo1]} 0%, ${mapaDeCores[pokemon.tipo1]} 70%, #111111 100%)`
              }}
            >
              <div className="pokemon-image">
                <img src={pokemon.imagemUrl} alt={pokemon.nome} />
              </div>
              <div className="pokemon-info">
                <h5>{pokemon.nome}</h5>
                <div>
                  <span className={`tipo tipo-${pokemon.tipo1}`}>{pokemon.tipo1}</span>
                  {pokemon.tipo2 && (
                    <span className={`tipo tipo-${pokemon.tipo2}`}>{pokemon.tipo2}</span>
                  )}
                </div>
                <p>Altura: {pokemon.altura} m</p>
                <p>Peso: {pokemon.peso} kg</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
