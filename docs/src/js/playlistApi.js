const BASE_URL = "http://localhost:4000";

// Função para criar playlist (POST)
async function criarPlaylist(usuarioId) {
    const response = await fetch(`${BASE_URL}/playlist/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ usuarioId }),
    });
    return response.json();
}
// Função para listar todas as playlists do usuario (GET)
async function listarPlaylistDoUsuario(usuarioId) {
    const response = await fetch(`${BASE_URL}/playlist/usuario/${usuarioId}`);
    return response.json();
}
// Função para buscar playlist por ID (GET)
async function buscarPlaylistPorId(id) {
    const response = await fetch(`${BASE_URL}/playlist/${id}`);
    return response.json();
}
// Função para buscar musicas pelo ID da playlist (GET)
async function buscarMusicaDaPlaylist(id) {
    const response = await fetch(`${BASE_URL}/playlist/${id}/musicas`);
    return response.json();
}
// Função para atualizar playlist por ID (PUT)
async function atualizarPlaylist(id, nome, avatar) {
    const response = await fetch(`${BASE_URL}/playlist/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ nome, avatar }),
    });
    return response.json();
}
// Função para deletar playlist por ID (DELETE)
async function deletarPlaylist(id) {
    const response = await fetch(`${BASE_URL}/playlist/${id}`, {
        method: "DELETE",
    });
    return response.status === 204;
}

export {
    criarPlaylist,
    listarPlaylistDoUsuario,
    buscarPlaylistPorId,
    buscarMusicaDaPlaylist,
    atualizarPlaylist,
    deletarPlaylist,
};
