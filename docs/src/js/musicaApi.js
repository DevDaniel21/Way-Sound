const BASE_URL = 'http://localhost:4000';

// Função para criar musica (POST)
async function criarMusica(nome, autor, foto, audio, usuario_id) {
    const response = await fetch(`${BASE_URL}/musica`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ nome, autor, foto, audio, usuario_id }),
    });
    return response.json();
}

// Função para listar todas as musicas (GET)
async function listarMusicas() {
    const response = await fetch(`${BASE_URL}/musica`);
    return response.json();
}

// Função para listar todas as musicas de usuario (GET)
async function listarMusicasUsuario(usuario_id) {
    const response = await fetch(`${BASE_URL}/musica/usuario/${usuario_id}`);
    return response.json();
}

// Função para buscar musica por nome (GET)
async function buscarMusicaPorId(id) {
    const response = await fetch(`${BASE_URL}/musica/carregar/${id}`);
    return response.json();
}

// Função para buscar musica por nome (GET)
async function buscarMusicaPorNome(nome) {
    const response = await fetch(`${BASE_URL}/musica/${nome}`);
    return response.json();
}

// Função para pesquisar musicas por nome (GET)
async function pesquisarMusicas(nome) {
    const response = await fetch(`${BASE_URL}/musica/search/${nome}`);
    return response.json();
}

// Função para atualizar musica por nome (PUT)
async function atualizarMusica(id, nome, foto, audio) {
    const response = await fetch(`${BASE_URL}/musica/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({nome ,foto, audio})
    });
    return response.json()
}
// Função para deletar musica por ID (DELETE)
async function deletarMusica(id) {
    const response = await fetch(`${BASE_URL}/musica/${id}`, {
        method: 'DELETE'
    });
    return response.status === 204;
}


export { criarMusica, listarMusicas, listarMusicasUsuario, buscarMusicaPorId, buscarMusicaPorNome, pesquisarMusicas, atualizarMusica, deletarMusica }