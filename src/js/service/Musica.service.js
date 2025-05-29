import { MusicaModel } from '../models/Musica.model.js';

const musicas = [];

// Carrega músicas do localStorage
function carregarMusicas() {
  const dados = localStorage.getItem('Musicas');
  if (dados) {
    const salvos = JSON.parse(dados);
    salvos.forEach(m => {
      musicas.push(new MusicaModel(m.nome, m.artista, m.foto, m.audio, m.id));
    });
  }
}

// Verifica se o nome da música é único
function check(nome) {
  if (nome === '') return false;
  return !musicas.some(musica => musica.nome === nome);
}

// Adiciona nova música
function add(event) {
  event.preventDefault();

  const nomeMusica = document.getElementById('nomeMusica').value;
  const nomeArtista = document.getElementById('nomeArtista').value;
  const imgFile = document.getElementById('imgUrl').files[0];
  const audioFile = document.getElementById('musicaAudio').files[0];

  if (check(nomeMusica) && nomeArtista && imgFile && audioFile) {
    const readerImg = new FileReader();
    const readerAudio = new FileReader();

    readerImg.onload = function () {
      const imgBase64 = readerImg.result;

      readerAudio.onload = function () {
        const audioBase64 = readerAudio.result;

        const novaMusica = new MusicaModel(nomeMusica, nomeArtista, imgBase64, audioBase64);
        musicas.push(novaMusica);
        updateLocalStorageMusicas();
        renderMusica();
        closePopup();
      };

      readerAudio.readAsDataURL(audioFile);
    };

    readerImg.readAsDataURL(imgFile);
  }
}

// Atualiza localStorage
function updateLocalStorageMusicas() {
  localStorage.setItem('Musicas', JSON.stringify(musicas));
}

// Renderiza todas as músicas
function renderMusica() {
  const container = document.getElementById('musicList');
  container.innerHTML = '';

  musicas.forEach((e) => {
    const musicCard = `
      <div class="card" data-id="${e.id}">
        <img src="${e.foto}" alt="Capa da música">
        <div class="card-content">
          <div class="column"><strong>Música: </strong>${e.nome}</div>
          <div class="column"><strong>Artista: </strong>${e.artista}</div>
          <audio controls src="${e.audio}"></audio>
        </div>
        <div class="dropdown">
          <button class="dropdown-btn">⋮</button>
          <div class="dropdown-content">
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Excluir</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', musicCard);
  });

  // Dropdown toggle
  document.querySelectorAll('.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = e.target.nextElementSibling;
      dropdown.classList.toggle('show');
    });
  });

  // Fecha dropdowns clicando fora
  window.addEventListener('click', (e) => {
    if (!e.target.matches('.dropdown-btn')) {
      document.querySelectorAll('.dropdown-content').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });

  // Excluir
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = parseInt(card.getAttribute('data-id'));
      excluirMusica(id);
    });
  });

  // Editar
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const id = parseInt(card.getAttribute('data-id'));
      editarMusica(id);
    });
  });

  closePopup();
}

// Excluir música
function excluirMusica(id) {
  const index = musicas.findIndex(m => m.id === id);
  if (index > -1) {
    musicas.splice(index, 1);
    updateLocalStorageMusicas();
    renderMusica();
  }
}

// Editar música
function editarMusica(id) {
  const musica = musicas.find(m => m.id === id);
  if (!musica) return;

  openPopup();
  document.getElementById('nomeMusica').value = musica.nome;
  document.getElementById('nomeArtista').value = musica.artista;
  document.getElementById('imgFileName').textContent = 'Imagem atual selecionada';
  document.getElementById('audioFileName').textContent = 'Áudio atual selecionado';

  const btnAdd = document.getElementById('btn-add');
  btnAdd.textContent = 'Salvar';
  btnAdd.removeEventListener('click', add);

  btnAdd.addEventListener('click', function salvarEdicao(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeMusica').value;
    const artista = document.getElementById('nomeArtista').value;
    const imgFile = document.getElementById('imgUrl').files[0];
    const audioFile = document.getElementById('musicaAudio').files[0];

    const atualizarDados = () => {
      musica.nome = nome;
      musica.artista = artista;
      updateLocalStorageMusicas();
      renderMusica();
      closePopup();
      btnAdd.textContent = 'Adicionar';
      btnAdd.removeEventListener('click', salvarEdicao);
      btnAdd.addEventListener('click', add);
    };

    if (imgFile) {
      const reader = new FileReader();
      reader.onload = () => {
        musica.foto = reader.result;
        if (audioFile) {
          const readerAudio = new FileReader();
          readerAudio.onload = () => {
            musica.audio = readerAudio.result;
            atualizarDados();
          };
          readerAudio.readAsDataURL(audioFile);
        } else {
          atualizarDados();
        }
      };
      reader.readAsDataURL(imgFile);
    } else if (audioFile) {
      const readerAudio = new FileReader();
      readerAudio.onload = () => {
        musica.audio = readerAudio.result;
        atualizarDados();
      };
      readerAudio.readAsDataURL(audioFile);
    } else {
      atualizarDados();
    }
  }, { once: true });
}

// Limpar campos
function clearFields() {
  document.getElementById('imgUrl').value = '';
  document.getElementById('nomeMusica').value = '';
  document.getElementById('nomeArtista').value = '';
  document.getElementById('musicaAudio').value = '';
  document.getElementById('imgFileName').textContent = '';
  document.getElementById('audioFileName').textContent = '';
}

// Abre popup
function openPopup() {
  document.getElementById('popupOverlay').style.display = 'flex';
}

// Fecha popup
function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
  clearFields();
}

// Botões para selecionar arquivos
document.getElementById('btnSelectImg').addEventListener('click', () => {
  document.getElementById('imgUrl').click();
});
document.getElementById('btnSelectAudio').addEventListener('click', () => {
  document.getElementById('musicaAudio').click();
});

document.getElementById('imgUrl').addEventListener('change', () => {
  const file = document.getElementById('imgUrl').files[0];
  document.getElementById('imgFileName').textContent = file ? file.name : '';
});
document.getElementById('musicaAudio').addEventListener('change', () => {
  const file = document.getElementById('musicaAudio').files[0];
  document.getElementById('audioFileName').textContent = file ? file.name : '';
});

// Botões principais
document.getElementById('publicar').addEventListener('click', openPopup);
document.getElementById('btn-add').addEventListener('click', add);
document.getElementById('btn-cancel').addEventListener('click', closePopup);

// Inicialização
carregarMusicas();
renderMusica();
