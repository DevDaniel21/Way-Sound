import { MusicaModel } from '../models/Musica.model.js'

const musicas = []

// Carrega músicas salvas no localStorage
function carregarMusicas() {
    const dados = localStorage.getItem('Musicas');
    if (dados) {
        const salvos = JSON.parse(dados);
        salvos.forEach(m => {
            musicas.push(new MusicaModel(m.nome, m.artista, m.foto, m.audio));
        });
    }
}

// Verifica se o nome já existe
function check(nome) {
    if (nome === '') {
        return 'Insira um nome válido!';
    } else {
        const jaCadastrado = musicas.some(musica => musica.nome === nome);
        return !jaCadastrado;
    }
}

// Adiciona nova música
function add() {
    event.preventDefault();

    let nomeMusica = document.getElementById('nomeMusica').value;
    let nomeArtista = document.getElementById('nomeArtista').value;
    let imgUrl = document.getElementById('imgUrl').files[0];
    let musicaAudio = document.getElementById('musicaAudio').files[0];

    let disponivel = check(nomeMusica);

    if (nomeMusica !== '' && disponivel === true && nomeArtista !== '' && imgUrl && musicaAudio) {
        const urlImg = URL.createObjectURL(imgUrl);
        const urlAudio = URL.createObjectURL(musicaAudio);

        let id = musicas.length + 1;
        musicas.push(new MusicaModel(nomeMusica, nomeArtista, urlImg, urlAudio, id));
        updateLocalStorageMusicas();

        alert('Música cadastrada com sucesso!');
        renderMusica();
    } else if (nomeMusica === '') {
        alert('Insira o nome da música!');
    } else if (disponivel !== true) {
        alert('Essa música já existe!');
    } else if (nomeArtista === '') {
        alert('Insira o nome do artista!');
    } else if (!imgUrl) {
        alert('Envie uma imagem!');
    } else if (!musicaAudio) {
        alert('Envie um arquivo de áudio!');
    }
}

// Atualiza localStorage
function updateLocalStorageMusicas() {
    localStorage.setItem('Musicas', JSON.stringify(musicas));
}

// Exibe as músicas na tela
function renderMusica() {
    const container = document.getElementById('musicList');
    container.innerHTML = '';

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

    closePopup();
}

// Abre o popup
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
}

// Fecha o popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    clearFields();
}

// Limpa os campos
function clearFields() {
    document.getElementById('imgUrl').value = '';
    document.getElementById('nomeMusica').value = '';
    document.getElementById('nomeArtista').value = '';
    document.getElementById('musicaAudio').value = '';
}

// Eventos
document.getElementById('publicar').addEventListener('click', openPopup);
document.getElementById('btn-add').addEventListener('click', add);
document.getElementById('btn-cancel').addEventListener('click', closePopup);

// Inicialização
carregarMusicas();
renderMusica();
