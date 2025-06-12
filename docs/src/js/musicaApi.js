const BASE_URL = 'http://localhost:4000';

// Função para criar musica (POST)
async function criarMusica(nome, autor, foto, audio) {
    const response = await fetch(`${BASE_URL}/musica`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ nome, autor, foto, audio }),
    });
    return response.json();
}

// Função para listar todas as musicas (GET)
async function listarMusicas() {
    const response = await fetch(`${BASE_URL}/musica`);
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
async function atualizarMusica(nome, foto, audio) {
    const response = await fetch(`${BASE_URL}/musica/${nome}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({foto, audio})
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


export { criarMusica, listarMusicas, buscarMusicaPorNome, pesquisarMusicas, atualizarMusica, deletarMusica }