import { buscarMusicaPorId } from './musicaApi.js';

const usuarioAtivo = localStorage.getItem('Usuario');

document.addEventListener('DOMContentLoaded', () => {
    const musicasList = document.getElementById('musicasList') || document.querySelector('.musicas-list');
    if (!musicasList) {
        console.error('Elemento da lista de músicas não encontrado!');
        return;
    }
    const playDisplay = document.getElementById('play');
    const playerIcon = document.querySelector('.playerIcon img');
    const playerTitulo = document.getElementById('playerMusic-titulo');
    const playerSubtitulo = document.getElementById('playerMusic-subtitulo');
    const audio = document.getElementById('audioSite');

    fetch('http://localhost:4000/musica')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(musicas => {
            musicasList.innerHTML = '';
            musicas.slice(0, 10).forEach(musica => {
                const li = document.createElement('li');
                li.className = 'musicas-card';
                li.setAttribute('data-id', musica.id);
                li.innerHTML = `
                    <img src="${musica.foto}" class="musicas-card-img">
                    <p class="musicas-card-titulo">${musica.nome}</p>
                    <p class="musicas-card-subtitulo">${musica.autor}</p>
                `;
                li.addEventListener('click', async () => {
                    if (!usuarioAtivo) return;
                    try {
                        const musicaData = await buscarMusicaPorId(musica.id);
                        audio.src = musicaData.audio;
                        playDisplay.click();
                        playerIcon.src = musicaData.foto;
                        playerTitulo.innerHTML = musicaData.nome;
                        playerSubtitulo.innerHTML = musicaData.autor;
                        playerTitulo.classList.remove('esqueleto');
                        playerSubtitulo.classList.remove('esqueleto');
                    } catch (error) {
                        console.log(error);
                    }
                });
                musicasList.appendChild(li);
            });
        })
        .catch(error => {
            musicasList.innerHTML = '<li>Erro ao carregar músicas.</li>';
            console.error(error);
        });
});
