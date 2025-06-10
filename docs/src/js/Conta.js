const janelaAtual = window.location.pathname.split('/').pop();
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

// DROPDOWN PERFIL
if (document.getElementById("perfilIcon")) {
    const perfilLinks = document.getElementById("perfilLinks");
    const perfilIcon = document.getElementById("perfilIcon");
    
    document.getElementById("perfilIcon").addEventListener("click", function () {
        if (perfilLinks.style.display === "block") {
            perfilLinks.style.display = "none";
        } else {
            perfilLinks.style.display = "block";
        }
    })
    
    // FECHAR O DROPDOWN AO CLICAR FORA
    document.addEventListener("click", function (event) {
        const isClickInside =
          perfilIcon.contains(event.target) || perfilLinks.contains(event.target);
      
        if (!isClickInside) {
          perfilLinks.style.display = "none";
        }
    })
    
    // OPÇÃO PARA SAIR DA CONTA
    document.querySelectorAll('.sairConta').forEach((e) => {
        if (e.innerHTML == 'Sair') {
            e.addEventListener('click', () => {
                localStorage.removeItem('usuarioLogado');
                window.location.href = '../../index.html';
            });
        }
    })
}

// CADASTRAR USUÁRIO
if (janelaAtual === 'registro.html') {
    document.addEventListener('DOMContentLoaded', () => { 
        // ADICIONAR USUARIO
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('registerUsuario').value;
            const email = document.getElementById('registerEmail').value;
            const senha = document.getElementById('registerSenha').value;

            try {
                const response = await fetch('http://localhost:4000/usuario', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha })
                });

                const data = await response.json();

                if (response.status === 201) {
                    alert('Usuário registrado com sucesso!');
                    document.getElementById('registerForm').reset();
                    localStorage.setItem('usuarioLogado', JSON.stringify(data));
                    window.location.href = './exemplo.html';
                } else {
                    alert(data.error || 'Erro ao registrar usuário');
                }
            } catch (error) {
                alert('Erro de conexão com o servidor');
                console.error(error);
            }
        });
    })
}

// FAZER LOGIN
else if (janelaAtual === 'entre.html') {
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const senha = document.getElementById('loginSenha').value;

            try {
                const response = await fetch(`http://localhost:4000/usuario/${email}`, {
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();

                if (response.status === 200) {
                    if (data.senha !== senha) {
                        alert('Senha incorreta');
                        return;
                    }
                    // alert('Login realizado com sucesso!');
                    localStorage.setItem('usuarioLogado', JSON.stringify(data));
                    window.location.href = './exemplo.html';
                } else {
                    alert(data.error || 'Erro ao realizar login');
                }
            } catch (error) {
                alert('Erro de conexão com o servidor');
                console.error(error);
            }
        });
    });
}

else if (janelaAtual === 'livraria.html') {
    // LISTAR PLAYLISTS
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('http://localhost:4000/playlist/usuario/' + usuarioLogado.id);
            const playlists = await response.json();

            if (response.status === 200) {
                const playlistList = document.getElementById('playlistList');

                playlists.forEach(playlist => {
                    const playlistItem = document.createElement('li');
                
                    if (playlist.avatar == null) {
                        playlist.avatar = '../../imgs/playlist.png';
                    }

                    playlistItem.addEventListener('click', () => {
                        window.location.href = `./playlist.html?id=${playlist.id}`;
                    })
                    playlistItem.setAttribute('data-id', playlist.id);
                    playlistItem.className = 'card-liv';
                    playlistItem.innerHTML = `
                        <img src="${playlist.avatar}" class="playlistAvatar">
                        <p class="artistas-card-titulo">${playlist.nome}</p>
                    `;
                    playlistList.appendChild(playlistItem);
                });
            } else {
                alert(playlists.error || 'Erro ao listar playlists');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor');
            console.error(error);
        }        
        
        // CADASTRAR PLAYLIST
        if (document.getElementById('playlistForm')) {
            document.getElementById('playlistForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const usuarioId = usuarioLogado.id;

                const response = await fetch('http://localhost:4000/playlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuarioId })
                });

                const data = await response.json();
                console.log(data)

                if (response.status === 201) {
                    alert('Playlist criada com sucesso!');
                    document.getElementById('playlistForm').reset();
                    window.location.href = './playlist.html?id=' + data.id;
                    } else {
                        alert(data.error || 'Erro ao criar playlist');
                    }
                    } catch (error) {
                        alert('Erro de conexão com o servidor');
                        console.error(error);
                    }
                });
        }
    });
}

else if (janelaAtual === 'playlist.html') {
    const playlistId = new URLSearchParams(window.location.search).get('id');
    
    document.addEventListener('DOMContentLoaded', async () => {
        // CARREGAR PLAYLIST
        try {
            const response = await fetch(`http://localhost:4000/playlist/${playlistId}`);
            let playlist = await response.json();

            if (response.status === 200) {
                // CARREGAR DADOS DA PLAYLIST
                document.getElementById('playlistNome').placeholder = playlist.nome;
                document.getElementById('playlistAvatar').style.backgroundImage = `url(${playlist.avatar})`;

            } else {
                alert(playlist.error || 'Erro ao carregar playlist');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor');
            console.error(error);
        }

        // MOSTRAR A QUANTIDADE DE MÚSICAS NA PLAYLIST
        try {
            const response = await fetch(`http://localhost:4000/playlist/${playlistId}/musicas`);
            let musicas = await response.json();

            // ATUALIZAR DADOS DA PLAYLIST
            if (response.status === 200) {
                document.getElementById('totalMusicas').textContent = musicas.length + ' músicas';
            } else {
                alert(musicas.error || 'Erro ao carregar musicas');
            }
        } catch (error) {
            alert('Erro de conexão com o servidor');
            console.error(error);
        }

        // ATUALIZAR NOME DA PLAYLIST
        // HABILITAR EDIÇÃO DO NOME DA PLAYLIST
        document.getElementById('habilitarEdicao').addEventListener('click', async () => {
            const inputDesabilitado = document.getElementById('playlistNome').disabled;

            if (inputDesabilitado == true) {
                document.getElementById('playlistNome').disabled = false;
                document.getElementById('playlistNome').focus();
            } else {
                // SALVA EDIÇÕES
                try {
                    const nome = document.getElementById('playlistNome').value;
                    let avatar = document.getElementById('avatar').getAttribute('src');

                    if (avatar === '../../imgs/lapis.svg') {
                        avatar = '';   
                    }
                    console.log(avatar)
                    
                    const response = await fetch(`http://localhost:4000/playlist/${playlistId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nome, avatar })
                    });

                    const data = await response.json();
                    if (response.status === 200) {
                        alert('Playlist atualizada com sucesso!');
                        window.location.reload();
                    } else {
                        alert(data.error || 'Erro ao atualizar playlist');
                    }
                } catch (error) {
                    alert('Erro de conexão com o servidor');
                    console.error(error);
                }
            }
        })
        // ADICIONAR MÚSICA NA PLAYLIST
    })
}

else if (janelaAtual === 'pesquisa.html') {
    document.addEventListener('DOMContentLoaded', async () => {
        pesquisaInput = document.getElementById('pesquisaInput');

        pesquisaInput.addEventListener('input', async () => {
            try {
                const nome = pesquisaInput.value

                const response = await fetch(`http://localhost:4000/musica/search?nome=${nome}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const musicas = await response.json()

                console.log(JSON.parse(musicas));
            } catch (error) {
                alert('Erro de conexão com o servidor');
                console.error(error);
            }
        })
    })
}