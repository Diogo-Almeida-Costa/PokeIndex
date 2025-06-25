import React, { useEffect, useState, useRef } from 'react';
import { buscarListaDePokemons } from '../services/pokeApi.service';
import { Pokemon } from '../types/Pokemon.types';
import '../style/pokedex.css';

const tipos = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic',
  'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

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
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [pokemonsSelecionados, setPokemonsSelecionados] = useState<Pokemon[]>([]);
  const maximoPokemons = 3;

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

  useEffect(() => {
    const handleClickFora = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAberto(false);
      }
    };

    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const handleSelecaoPokemon = (pokemon: Pokemon) => {
    setPokemonsSelecionados(prev => {
      const jaSelecionado = prev.some(p => p.id === pokemon.id);
      
      if (jaSelecionado) {
        // Remove se já estiver selecionado
        return prev.filter(p => p.id !== pokemon.id);
      } else {
        // Adiciona se ainda houver espaço
        if (prev.length < maximoPokemons) {
          return [...prev, pokemon];
        } else {
          alert(`Você só pode selecionar no máximo ${maximoPokemons} pokémons!`);
          return prev;
        }
      }
    });
  };

  const salvarTime = () => {
    if (pokemonsSelecionados.length === 0) {
      alert('Selecione pelo menos um pokémon!');
      return;
    }

    // Recupera times existentes ou inicia novo array
    const timesSalvos = localStorage.getItem('meusTimesPokemon');
    const meusTimes: any[] = timesSalvos ? JSON.parse(timesSalvos) : [];

    // Cria novo time
    const novoTime = {
      nome: `Time ${meusTimes.length + 1}`,
      pokemons: pokemonsSelecionados.map(p => ({
        id: p.id,
        nome: p.nome,
        imagem: p.imagemUrl
      }))
    };

    // Salva e redireciona
    localStorage.setItem('meusTimesPokemon', JSON.stringify([...meusTimes, novoTime]));
    alert(`Time "${novoTime.nome}" salvo com sucesso!`);
    window.location.href = '/visualizarTimes'; // Ajuste conforme suas rotas
  };

  const pokemonsFiltrados =
    tiposSelecionados.length > 0
      ? pokemons.filter(
          p => tiposSelecionados.includes(p.tipo1) || (p.tipo2 && tiposSelecionados.includes(p.tipo2))
        )
      : pokemons;

  return (
    <div className="pokedex-container">
      {/* Botão de Confirmação (Header) */}
      {pokemonsSelecionados.length > 0 && (
        <div className="text-center my-3">
          <button 
            className="btn btn-success"
            onClick={salvarTime}
          >
            Confirmar ({pokemonsSelecionados.length}/{maximoPokemons})
          </button>
        </div>
      )}

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

      <div className="filtro-container" ref={dropdownRef}>
        <button
          className="btn-filtro"
          aria-expanded={dropdownAberto}
          onClick={() => setDropdownAberto(!dropdownAberto)}
        >
          {tiposSelecionados.length > 0
            ? `${tiposSelecionados.length} tipo(s) selecionado(s)`
            : 'Filtrar por tipo'}
        </button>

        <div 
          id="painel-tipos" 
          className={`painel-tipos ${dropdownAberto ? 'show' : ''}`}
        >
          <div className="tipos-grid">
            {tipos.map(tipo => (
              <button
                key={tipo}
                className={`tipo-chip tipo-${tipo} ${tiposSelecionados.includes(tipo) ? 'ativo' : ''}`}
                onClick={() => {
                  setTiposSelecionados(prev =>
                    prev.includes(tipo)
                      ? prev.filter(t => t !== tipo)
                      : [...prev, tipo]
                  );
                }}
              >
                {tipo}
              </button>
            ))}
          </div>
          {tiposSelecionados.length > 0 && (
            <button 
              className="btn-limpar" 
              onClick={() => {
                setTiposSelecionados([]);
                setDropdownAberto(false);
              }}
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-danger">{erro}</p>}

      {!carregando && pokemonsFiltrados.length === 0 && (
        <p className="text-light text-center">Nenhum Pokémon encontrado com esse filtro.</p>
      )}

      <div className="row">
        {pokemonsFiltrados.map(pokemon => {
          const estaSelecionado = pokemonsSelecionados.some(p => p.id === pokemon.id);
          
          return (
            <div className="col-md-4 mb-4" key={pokemon.id}>
              <div
                className={`pokemon-card ${estaSelecionado ? 'selecionado' : ''}`}
                style={{
                  background: pokemon.tipo2
                    ? `linear-gradient(to bottom, ${mapaDeCores[pokemon.tipo1]} 0%, ${mapaDeCores[pokemon.tipo1]} 50%, ${mapaDeCores[pokemon.tipo2]} 100%)`
                    : `linear-gradient(to bottom, ${mapaDeCores[pokemon.tipo1]} 0%, ${mapaDeCores[pokemon.tipo1]} 70%, #111111 100%)`,
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onClick={() => handleSelecaoPokemon(pokemon)}
              >
                {estaSelecionado && (
                  <div className="selecionado-indicator">
                    <span>✓</span>
                  </div>
                )}
                
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
          );
        })}
      </div>

      {/* Botão de Confirmação (Footer) */}
      {pokemonsSelecionados.length > 0 && (
        <div className="fixed-bottom text-center p-3 bg-dark">
          <button 
            className="btn btn-lg btn-success"
            onClick={salvarTime}
          >
            SALVAR TIME ({pokemonsSelecionados.length}/{maximoPokemons})
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokedex;