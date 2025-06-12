import {
    criarPlaylist,
    listarPlaylistDoUsuario,
    buscarPlaylistPorId,
    buscarMusicaDaPlaylist,
    atualizarPlaylist,
    deletarPlaylist,
} from "./playlistApi.js";

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
        if (playlist.avatar != null) document.getElementById("playlistAvatar").style.backgroundImage = `url(${playlist.avatar})`;
    } catch (error) {
        alert("Erro de conexão com o servidor");
        console.error(error);
    }

    // MOSTRAR A QUANTIDADE DE MÚSICAS NA PLAYLIST
    try {
        // corrigir
        const response = await buscarMusicaDaPlaylist(id);
        let musicas = await response;

        // ATUALIZAR DADOS DA PLAYLIST
        document.getElementById("totalMusicas").textContent = musicas.length + " músicas";
    } catch (error) {
        alert("Erro de conexão com o servidor");
        console.error(error);
    }
}

// EDITAR PLAYLIST
async function handleEditPlaylist() {
    const playlistId = new URLSearchParams(window.location.search).get("id");
    const inputDesabilitado = document.getElementById("playlistNome").disabled;

    if (inputDesabilitado == true) {
        document.getElementById("playlistNome").disabled = false;
        document.getElementById("playlistNome").focus();
    } else {
        // SALVA EDIÇÕES
        try {
            const nome = document.getElementById("playlistNome").value;
            let avatar = document.getElementById("avatar").getAttribute("src");

            if (avatar === "../../imgs/lapis.svg") {
                avatar = "";
            }

            const response = await atualizarPlaylist(playlistId, nome, avatar);

            const data = await response;
            alert("Playlist atualizada com sucesso!");
            window.location.reload();
        } catch (error) {
            alert("Erro de conexão com o servidor");
            console.error(error);
        }
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
});
