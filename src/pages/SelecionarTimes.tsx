// src/components/SelecionarTimes.tsx

import React, { useEffect, useState, useRef } from 'react';
import { buscarListaDePokemons } from '../services/pokeApi.service';
import { Pokemon } from '../types/Pokemon.types';
import '../style/pokedex.css';

// (Opcional) serviço que você implementará depois
// import { salvarTime } from '../services/timeService';

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

const MAX_SELECOES = 6;

export const SelecionarTimes: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState('Kanto');
  const [regiaoEmCarregamento, setRegiaoEmCarregamento] = useState<string | null>(null);
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const carregarPokemons = async (limit: number, offset: number, nome: string) => {
    setRegiaoEmCarregamento(nome);
    setCarregando(true);
    setRegiaoSelecionada(nome);
    try {
      const lista = await buscarListaDePokemons(limit, offset);
      setPokemons(lista);
      setErro(null);
      setSelecionados([]); // limpa seleção ao trocar região
    } catch {
      setErro('Falha ao carregar pokémons.');
    } finally {
      setCarregando(false);
      setRegiaoEmCarregamento(null);
    }
  };

  useEffect(() => {
    const reg = regioes.find(r => r.nome === regiaoSelecionada)!;
    carregarPokemons(reg.limit, reg.offset, reg.nome);
  }, [regiaoSelecionada]);

  useEffect(() => {
    const aoClicarFora = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener('mousedown', aoClicarFora);
    return () => document.removeEventListener('mousedown', aoClicarFora);
  }, []);

  const pokemonsFiltrados = tiposSelecionados.length
    ? pokemons.filter(p =>
        tiposSelecionados.includes(p.tipo1) ||
        (p.tipo2 && tiposSelecionados.includes(p.tipo2))
      )
    : pokemons;

  const toggleSelecao = (id: number) => {
    const jaSel = selecionados.includes(id);
    if (jaSel) {
      setSelecionados(selecionados.filter(x => x !== id));
    } else {
      if (selecionados.length >= MAX_SELECOES) {
        alert(`Você só pode escolher até ${MAX_SELECOES} pokémons.`);
        return;
      }
      setSelecionados([...selecionados, id]);
    }
  };

  const montarTime = () => {
    // aqui você chama seu serviço de salvar time
    // salvarTime(selecionados).then(...).catch(...)
    console.log('Time montado:', selecionados);
    alert('Time salvo com sucesso!');
  };

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title">Monte seu Time</h2>

      {/* Seletor de Região */}
      <div className="text-center mb-4">
        {regioes.map(r => (
          <button
            key={r.nome}
            className={`regiao-btn ${r.nome === regiaoSelecionada ? 'active' : ''}`}
            onClick={() => carregarPokemons(r.limit, r.offset, r.nome)}
            disabled={carregando && regiaoEmCarregamento === r.nome}
          >
            {carregando && regiaoEmCarregamento === r.nome
              ? <span className="spinner-border spinner-border-sm" />
              : r.nome}
          </button>
        ))}
      </div>

      {/* Filtro de Tipos */}
      <div className="filtro-container" ref={dropdownRef}>
        <button
          className="btn-filtro"
          onClick={() => setDropdownAberto(!dropdownAberto)}
          aria-expanded={dropdownAberto}
        >
          {tiposSelecionados.length
            ? `${tiposSelecionados.length} tipo(s) selecionado(s)`
            : 'Filtrar por tipo'}
        </button>
        <div className={`painel-tipos ${dropdownAberto ? 'show' : ''}`}>
          <div className="tipos-grid">
            {tipos.map(tipo => (
              <button
                key={tipo}
                className={`tipo-chip tipo-${tipo} ${
                  tiposSelecionados.includes(tipo) ? 'ativo' : ''
                }`}
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
              onClick={() => setTiposSelecionados([])}
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-danger">{erro}</p>}

      <div className="row">
        {pokemonsFiltrados.map(p => {
          const marcado = selecionados.includes(p.id);
          return (
            <div className="col-md-4 mb-4" key={p.id}>
              <div
                className={`pokemon-card ${marcado ? 'selecionado' : ''}`}
                style={{
                  cursor: 'pointer',
                  background: p.tipo2
                    ? `linear-gradient(to bottom,
                       ${mapaDeCores[p.tipo1]} 0%,
                       ${mapaDeCores[p.tipo1]} 50%,
                       ${mapaDeCores[p.tipo2]} 100%)`
                    : `linear-gradient(to bottom,
                       ${mapaDeCores[p.tipo1]} 0%,
                       ${mapaDeCores[p.tipo1]} 70%,
                       #111111 100%)`
                }}
                onClick={() => toggleSelecao(p.id)}
              >
                <div className="pokemon-image">
                  <img src={p.imagemUrl} alt={p.nome} />
                </div>
                <div className="pokemon-info">
                  <h5>{p.nome}</h5>
                  <div>
                    <span className={`tipo tipo-${p.tipo1}`}>{p.tipo1}</span>
                    {p.tipo2 && (
                      <span className={`tipo tipo-${p.tipo2}`}>{p.tipo2}</span>
                    )}
                  </div>
                  <p>Altura: {p.altura} m</p>
                  <p>Peso: {p.peso} kg</p>
                  <div className="form-check mt-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={marcado}
                      onChange={() => toggleSelecao(p.id)}
                      id={`chk-${p.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`chk-${p.id}`}
                    >
                      Selecionar
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selecionados.length > 0 && (
        <div className="text-center mb-5">
          <button
            className="btn btn-success btn-lg"
            onClick={montarTime}
          >
            Montar Time ({selecionados.length}/{MAX_SELECOES})
          </button>
        </div>
      )}
    </div>
  );
};

export default SelecionarTimes;
