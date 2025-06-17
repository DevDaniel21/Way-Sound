import {
    criarPlaylist,
    listarPlaylistDoUsuario,
    buscarPlaylistPorId,
    buscarMusicaDaPlaylist,
    atualizarPlaylist,
    deletarPlaylist,
} from "./playlistApi.js";

import { listarMusicas } from './musicaApi.js'

// DESCOBRIR O ID DO USUARIO
import { buscarUsuarioPorEmail } from "./usuarioApi.js";
import { usuarioAtivo } from "./usuarioService.js";
async function pegarIdDoUsuario() {
    const usuario = await buscarUsuarioPorEmail(usuarioAtivo);
    return usuario.id;
}

// PARTE DE REGISTRAR
async function handleCreatePlaylist() {
    try {
        const usuarioId = await pegarIdDoUsuario();
        const response = await criarPlaylist(usuarioId);

        alert("Playlist criada com sucesso!");
        console.log(response);
        window.location.href = "./playlist.html?id=" + response.id;
    } catch (error) {
        console.log(error);
        alert("Erro ao criar playlist!");
    }
}

// EXIBIR AS PLAYLISTS DO USUÁRIO
async function carregarPlaylists() {
    const usuarioId = await pegarIdDoUsuario();
    const response = await listarPlaylistDoUsuario(usuarioId);
    const playlists = await response;
    const playlistList = document.getElementById("playlistList");

    playlists.forEach((playlist) => {
        const playlistItem = document.createElement("li");

        if (playlist.avatar == null) {
            playlist.avatar = "../../imgs/playlist.png";
        }

        playlistItem.addEventListener("click", () => {
            window.location.href = `./playlist.html?id=${playlist.id}`;
        });
        playlistItem.setAttribute("data-id", playlist.id);
        playlistItem.className = "card-liv";
        playlistItem.innerHTML = `
            <img src="${playlist.avatar}" class="playlistAvatar">
            <p class="artistas-card-titulo">${playlist.nome}</p>
        `;
        playlistList.appendChild(playlistItem);
    });
}

// EXIBIR DADOS DA PLAYLIST
async function carregarDadosPlaylist() {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await buscarPlaylistPorId(id);
        let playlist = await response;

        // CARREGAR DADOS DA PLAYLIST
        document.getElementById("playlistNome").placeholder = playlist.nome;
        if (playlist.avatar != null)  {
            document.getElementById("playlistAvatar").style.backgroundImage = `url(${playlist.avatar})`;
            document.getElementById('avatar').style.display = 'none'
    }
    } catch (error) {
        alert("Erro de conexão com o servidor");
        console.error(error);
    }

}

// EDITAR PLAYLIST
async function handleEditPlaylist() {
    const playlistId = new URLSearchParams(window.location.search).get("id")
    const playlist = await buscarPlaylistPorId(playlistId)
    let novoNome = document.getElementById("playlistNome").value.trim()
    if (!novoNome) novoNome = playlist.nome
  
    let novoAvatar = playlist.avatar
    const file = document.getElementById("playAvatar").files[0]
    if (file) {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("http://localhost:4000/upload/imagem", { method: "POST", body: fd })
      const { url } = await res.json()
      novoAvatar = url
    }
  
    try {
      await atualizarPlaylist(playlistId, novoNome, novoAvatar);
      alert("Playlist atualizada com sucesso!")
      window.location.reload()
    } catch (e) {
      console.error(e)
      alert("Erro de conexão com o servidor")
    }
  }
  

// DELETAR PLAYLIST
async function handleDeletePlaylist() {
    const playlistId = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await deletarPlaylist(playlistId);
        alert("Playlist deletada com sucesso!");
        window.location.href = "./livraria.html";
    } catch (error) {
        console.log(error);
        alert("Erro ao deletar playlist!");
    }
}
// Inicialização do listener
document.addEventListener("DOMContentLoaded", function () {
    // CARREGAR PLAYLISTS
    const playlistList = document.getElementById("playlistList");
    if (playlistList != null) carregarPlaylists();
    // CARREGAR DADOS DA PLAYLIST
    const playlistId = new URLSearchParams(window.location.search).get("id");
    if (playlistId) carregarDadosPlaylist();
    // CARREGAR O BOTAO DE REGISTRAR
    const createPlaylist = document.getElementById("createPlaylist");
    if (createPlaylist)
        createPlaylist.addEventListener("click", handleCreatePlaylist);
    // CARREGAR O BOTAO DE EDIÇÃO
    const habilitarEdicao = document.getElementById("habilitarEdicao");
    if (habilitarEdicao)
        habilitarEdicao.addEventListener("click", handleEditPlaylist);
    // CARREGAR O BOTAO DE APAGAR PLAYLIST
    const deletePlaylist = document.getElementById("deletePlaylist");
    if (deletePlaylist)
        deletePlaylist.addEventListener("click", handleDeletePlaylist);
    const btnAlterarAvatar = document.getElementById('playlistAvatar');
    if (btnAlterarAvatar) {
      btnAlterarAvatar.addEventListener('click', function() {
        document.getElementById('playAvatar').click();
      });
    }
    const avatarplay = document.getElementById('playAvatar');
    if (avatarplay) avatarplay.addEventListener('change', handleEditPlaylist);
});

