import { criarMusica, listarMusicas, listarMusicasUsuario, buscarMusicaPorId, buscarMusicaPorNome, atualizarMusica, deletarMusica } from "./musicaApi.js";
import { buscarUsuarioPorEmail } from "./usuarioApi.js";

let usuarioAtivo = localStorage.getItem('Usuario');

// VERIFICAR SE JÁ EXISTE MUSICA
async function verificarMusicaExiste(nome) {
    try {
        const response = await buscarMusicaPorNome(nome);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// CRIAR MÚSICA
async function handleCreateMusic(e) {
    e.preventDefault();
    let usuario_id = null;

    try {
        const usuario = await buscarUsuarioPorEmail(usuarioAtivo);
        usuario_id = usuario.id;
    } catch (error) {
        console.log(error)
    }

    const nome = document.getElementById('nomeMusica').value;
    const artista = document.getElementById('nomeArtista').value;

    // Imagem
    const formDataImg = new FormData();
    formDataImg.append('file', document.getElementById('imgUrl').files[0]);
    const resImg = await fetch('http://localhost:4000/upload/imagem', {
        method: 'POST',
        body: formDataImg
    });
    const imgData = await resImg.json();
    const foto = imgData.url;

    // Áudio
    const formDataAudio = new FormData();
    formDataAudio.append('file', document.getElementById('musicaAudio').files[0]);
    const resAudio = await fetch('http://localhost:4000/upload/audio', {
        method: 'POST',
        body: formDataAudio
    });
    const audioData = await resAudio.json();
    const audio = audioData.url;

    if (!nome.trim() || !foto.trim() || !audio.trim()) {
        alert('Existem campos vazios');
        return
    } else {
        const musicaExiste = await verificarMusicaExiste(nome)
        if (musicaExiste.error === 'Música não encontrada') {
            try {
                const novaMusica = await criarMusica(nome, artista, foto, audio, usuario_id);
                alert('Música publicada com sucesso!');
                const btnCancel = document.getElementById('btn-cancel');
                btnCancel.click();
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Essa musica já existe!');
            return
        }
    }
    console.log('Nome: ', nome, 'Artista: ', artista, 'Foto: ', foto, 'Audio: ', audio, 'Usuario: ', usuario_id);
}
// EDITAR MÚSICA
async function editarMusica(id) {
    const musica = await buscarMusicaPorId(id)
    if (!musica) return;

    document.getElementById('popupOverlay').style.display = 'flex'
    
    document.getElementById('nomeMusica').value = musica.nome;
    document.getElementById('imgFileName').textContent = musica.foto;
    document.getElementById('audioFileName').textContent = musica.audio;
    
    const btnAdd = document.getElementById('btn-add');
    btnAdd.textContent = 'Salvar';
    btnAdd.type = 'button'
    
    btnAdd.addEventListener('click', async function salvarEdicao() {
        const nome = document.getElementById('nomeMusica').value;
        const foto = document.getElementById('imgUrl').value;
        const audio = document.getElementById('musicaAudio').value;
        
        try {
            const musicaAtualizada = await atualizarMusica(id ,nome, foto, audio);
            carregarMusicasUsuario();
            document.getElementById('popupOverlay').style.display = 'none'
            btnAdd.textContent = 'Adicionar';
            btnAdd.type = 'submit'
            btnAdd.removeEventListener('click', salvarEdicao);
        } catch (error) {
            console.log(error)
        }
        });
};

// EXCLUIR MÚSICA
async function excluirMusica(id) {
    try {
        const musicaDeletada = await deletarMusica(id);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

// CARREGAR MUSICAS
async function carregarMusicasUsuario() {
    const container = document.getElementById('musicList');
    let usuario_id = null;
    
    try {
        const usuario = await buscarUsuarioPorEmail(usuarioAtivo);
        usuario_id = usuario.id;
    } catch (error) {
        console.log(error);
    }

    try {
        const musicas = await listarMusicasUsuario(usuario_id);
        container.innerHTML = '';
    
        musicas.forEach((e) => {
            const musicCard = `
            <div class="card" data-id="${e.id}">
                <img src="${e.foto}" alt="Capa da música">
                <div class="card-content">
                <div class="column"><strong>Música: </strong>${e.nome}</div>
                <div class="column"><strong>Artista: </strong>${e.autor}</div>
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
    } catch (error) {
        console.log(error);
    }
    // DROPDOWN MUSICA
    const dropdownMusica = document.querySelectorAll('.dropdown-btn')

    if (dropdownMusica) {
        dropdownMusica.forEach(btn => {
            btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = e.currentTarget.parentElement.querySelector('.dropdown-content');
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');    
            } else {
                dropdown.classList.add('show');
            }
            });
        });
    }

    // Fecha o dropdown ao clicar fora
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-content.show').forEach(drop => {
            drop.classList.remove('show');
        });
    });
    // BOTAO DE EDITAR
    const btnEdit = document.querySelectorAll('.btn-edit')
    if (btnEdit) btnEdit.forEach(btn => {
        btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const id = parseInt(card.getAttribute('data-id'));
        editarMusica(id);
        });
    });
    // BOTAO DE EXCLUIR
    const btnDelete = document.querySelectorAll('.btn-delete');
    if (btnDelete) btnDelete.forEach(btn => {
        btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const id = parseInt(card.getAttribute('data-id'));
        excluirMusica(id);
        });
    });
}

// Inicialização dos listener
document.addEventListener('DOMContentLoaded', () => {
    // ATUALIZAR INPUTS
    async function carregarArtista() {
        try {
            const usuario = await buscarUsuarioPorEmail(usuarioAtivo);
            const artista = document.getElementById('nomeArtista');
            artista.value = usuario.nome;
        } catch (error) {
            console.log(error)
        }
    }
    carregarArtista()
    // Descrição de qual escolheu
    const imgUrl = document.getElementById('imgUrl');
    if (imgUrl) imgUrl.addEventListener('change', () => {
        document.getElementById('imgFileName').textContent = imgUrl.files[0].name;
    })
    // Descrição de qual escolheu
    const musicaAudio = document.getElementById('musicaAudio');
    if (musicaAudio) musicaAudio.addEventListener('change', () => {
        document.getElementById('audioFileName').textContent = musicaAudio.files[0].name;
    })
    // CARREGAR MUSICAS DO USUARIO
    carregarMusicasUsuario()
    // BOTAO PARA COMEÇAR A CRIAR MUSICA
    const publicar = document.getElementById('publicar');
    if (publicar) publicar.addEventListener('click', () => {
        document.getElementById('popupOverlay').style.display = 'flex'
    });
    // BOTAO DE CRIAR MUSICA
    const formMusic = document.getElementById('formMusic');
    if (formMusic) formMusic.addEventListener('submit', handleCreateMusic);
    // BOTAO DE CANCELAR FORM DA MUSICA
    const btnCancel = document.getElementById('btn-cancel');
    if (btnCancel) btnCancel.addEventListener('click', () => {
        document.getElementById('popupOverlay').style.display = 'none';
        document.getElementById('formMusic').reset();
        document.getElementById('audioFileName').textContent = '';
        document.getElementById('imgFileName').textContent = '';
        carregarArtista()
    })

})