import { pesquisarMusicas } from './musicaApi.js'

// FAZER PESQUISA
async function updateSearchResults(nome) {
    try {
        const musicas = await pesquisarMusicas(nome);
        const musicasList = document.getElementById('musicasList');
        musicasList.innerHTML = '';

        musicas.forEach(musica => {
            const musicaItem = document.createElement('div');
            musicaItem.className = 'card-music';
            musicaItem.innerHTML = `
                <div class="foto-music">
                    <img src="${musica.foto}" alt="" class="img-cantor">
                </div>
                <div class="text-music">
                    ${musica.nome}<br>
                    <div class="text-music">${musica.autor}</div>
                </div>
                <div class="icones">
                    <button class="btn-toggle">
                        <ion-icon name="play-outline" class="icon-toggle"></ion-icon>
                    </button>
                </div>
            `;
            musicasList.appendChild(musicaItem);
        });

        console.log(musicas)
    } catch (error) {
        // console.log('Erro ao pesquisar músicas!')
        console.log('Campo de pesquisa vazio!')
    }
}

let timeout;

// Inicialização do listener
document.addEventListener("DOMContentLoaded", function () {
    // CARREGAR O INPUT DA PESQUISA
    const searchInput = document.getElementById('pesquisaInput');
    if (searchInput) searchInput.addEventListener('input', (e) => {
        clearTimeout(timeout);
        const nome = e.target.value;

        timeout = setTimeout(() => {
            updateSearchResults(nome);
        }, 500);
    });
});