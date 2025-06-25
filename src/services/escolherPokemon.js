// js/escolherPokemon.js
import { lista_pokemons } from './listaTodosPokemons.js';

function criarCardPokemonHTML(pokemon) {
    let tiposHTML = '';
    if (pokemon.tipo1) {
        tiposHTML += `<span class="badge ${pokemon.getTipoCssClass(pokemon.tipo1)}">${pokemon.tipo1}</span>`;
    }
    if (pokemon.tipo2) {
        tiposHTML += ` <span class="badge ${pokemon.getTipoCssClass(pokemon.tipo2)}">${pokemon.tipo2}</span>`;
    }

    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card pokeCard h-100" 
                 id="pokemon-${pokemon.id}" 
                 data-pokemon-id="${pokemon.id}"
                 data-pokemon-name="${pokemon.nome}"
                 data-pokemon-image="${pokemon.imagemUrl}">
                <input type="checkbox" class="pokemon-checkbox form-check-input" aria-label="Selecionar ${pokemon.nome}">
                <img src="${pokemon.imagemUrl}" class="card-img-top poke-image" alt="${pokemon.nome}">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title poke-name">${pokemon.nome}</h5>
                    <div class="tipos mb-2">
                        ${tiposHTML}
                    </div>
                    <p class="card-text poke-description flex-grow-1">${pokemon.descricao}</p>
                </div>
            </div>
        </div>
    `;
}


document.addEventListener('DOMContentLoaded', () => {
    const pokemonCardContainer = document.getElementById('pokemonCardContainer');

    
    if (pokemonCardContainer) {

        lista_pokemons.forEach(pokemon => {
            pokemonCardContainer.innerHTML += criarCardPokemonHTML(pokemon);
        });
    } else {
       
        console.error("Elemento com ID 'pokemonCardContainer' não encontrado no DOM.");
        return;
    }

    const checkboxes = document.querySelectorAll('.pokemon-checkbox');
    const botaoConfirmarHeader = document.getElementById('botaoConfirmarSelecao');
    const botaoSalvarInferior = document.getElementById('botaoSalvarTimeInferior');
    let pokemonsSelecionadosAtualmente = []; 
    const maximoPokemons = 3; 

    atualizarVisibilidadeBotoes(); 

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const card = checkbox.closest('.pokeCard'); 
            if (!card) return;

            const idPokemon = card.dataset.pokemonId;
            const nomePokemon = card.dataset.pokemonName;
            const imagemPokemon = card.dataset.pokemonImage;
            const isChecked = checkbox.checked; // Verifica se o checkbox está marcado
            
            // Verifica se o Pokémon já foi selecionado anteriormente
            const indiceJaSelecionado = pokemonsSelecionadosAtualmente.findIndex(p => p.id === idPokemon);

            if (isChecked) { // Se o checkbox foi MARCADO
                if (indiceJaSelecionado === -1) { // Se o Pokémon AINDA NÃO está na lista de selecionados
                    if (pokemonsSelecionadosAtualmente.length < maximoPokemons) {
                        // Adiciona o Pokémon à lista de selecionados
                        pokemonsSelecionadosAtualmente.push({ id: idPokemon, nome: nomePokemon, imagem: imagemPokemon });
                        card.classList.add('selecionado'); // Adiciona uma classe para feedback visual
                    } else {
                        // Se o limite foi atingido, desmarca o checkbox e avisa o usuário
                        checkbox.checked = false;
                        alert(`Você pode selecionar no máximo ${maximoPokemons} Pokémons!`);
                    }
                }
            } else { // Se o checkbox foi DESMARCADO
                if (indiceJaSelecionado > -1) { // Se o Pokémon ESTAVA na lista de selecionados
                    // Remove o Pokémon da lista
                    pokemonsSelecionadosAtualmente.splice(indiceJaSelecionado, 1);
                    card.classList.remove('selecionado'); // Remove a classe de feedback visual
                }
            }
            atualizarVisibilidadeBotoes(); // Atualiza o estado dos botões de confirmação
        });
    });

    function atualizarVisibilidadeBotoes() {
        const numSelecionados = pokemonsSelecionadosAtualmente.length;

        // Lógica para o botão de confirmar no cabeçalho
        if (botaoConfirmarHeader) {
            if (numSelecionados > 0 && numSelecionados <= maximoPokemons) {
                botaoConfirmarHeader.style.display = 'block';
                botaoConfirmarHeader.textContent = `Confirmar (${numSelecionados}/${maximoPokemons})`;
            } else {
                botaoConfirmarHeader.style.display = 'none';
            }
        }
       
        // Lógica para o botão de salvar na parte inferior da página
        if (botaoSalvarInferior) {
            if (numSelecionados === maximoPokemons) { // Mostra apenas quando o máximo de Pokémons é selecionado
                botaoSalvarInferior.style.display = 'block';
            } else {
                botaoSalvarInferior.style.display = 'none';
            }
        }
    }

    function salvarERedirecionar() {
        if (pokemonsSelecionadosAtualmente.length === 0) {
            alert('Selecione ao menos um Pokémon para o seu time!');
            return false; // Impede o processo se nenhum Pokémon foi selecionado
        }
        
        // Busca os times já salvos no localStorage
        let meusTimes = localStorage.getItem('meusTimesPokemon');
        meusTimes = meusTimes ? JSON.parse(meusTimes) : []; // Se não houver, inicia um array vazio

        // Cria um nome para o novo time
        const nomeDoNovoTime = `Time ${meusTimes.length + 1}`; 
        // Adiciona o novo time à lista
        meusTimes.push({
            nome: nomeDoNovoTime,
            pokemons: [...pokemonsSelecionadosAtualmente] 
        });

       
        localStorage.setItem('meusTimesPokemon', JSON.stringify(meusTimes));
        
       
        pokemonsSelecionadosAtualmente = []; 
        checkboxes.forEach(cb => {
            cb.checked = false; 
            const card = cb.closest('.pokeCard');
            if (card) {
                card.classList.remove('selecionado'); 
            }
        });
        atualizarVisibilidadeBotoes(); 

        alert(`Time "${nomeDoNovoTime}" salvo! Redirecionando para Meus Times.`);
        window.location.href = 'visualizarTimes.html'; 
        return true;
    }

    if (botaoConfirmarHeader) {
        botaoConfirmarHeader.addEventListener('click', salvarERedirecionar);
    }
    if (botaoSalvarInferior) {
        botaoSalvarInferior.addEventListener('click', salvarERedirecionar);
    }
});