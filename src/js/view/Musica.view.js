export class MusicaView {
    renderPublicar(listMusicas) {
        const container = document.getElementById('musicList');
        container.innerHTML = '';
        
        let musicas = listMusicas
        console.log(musicas)

        musicas.forEach((e) => {
            const musicCard = `
                <div class="card">
                    <img src="${e.foto}" alt="Capa da música">
                    <div class="card-content">
                        <div class="column"><strong>Música: </strong>${e.nome}</div>
                        <div class="column"><strong>Artista: </strong>${e.artista}</div>
                        <audio controls src="${e.audio}"></audio>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', musicCard);
        });
        console.log('Músicas publicadas carregadas')
    }

    renderMusicas(musicas) {
        let windowAtual = window.location.pathname;
        if (windowAtual == '/index.html') {
            for(let i = 0; i < 5; i++) {
                musicasList.innerHTML += `
                    <li class="musicas-card" data-audio="${musicas[i].audio}">
                        <figure style="background-image: ${musicas[i].foto};" class="musicas-card-img">
                            <button class="card-button" id="botao-roxo">▶</button>
                        </figure>
                        <p class="musicas-card-titulo">${musicas[i].nome}</p>
                        <p class="musicas-card-subtitulo">${musicas[i].artista}</p>
                    </li>
                `
            }
        } 
        else if (windowAtual == '/src/html/pesquisa.html') {

        }
    }
}

// INDEX
const secaoArtistas = document.getElementById('secaoArtistas');
const artistasList = document.getElementById('artistasList');
const artistasForList = [];

const secaoMusicas = document.getElementById('secaoMusicas');
const musicasList = document.getElementById('musicasList');
const musicasForList = [];