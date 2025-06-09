const janelaAtual = window.location.pathname.split('/').pop();
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

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

// CADASTRAR PLAYLIST
else if (janelaAtual === 'livraria.html') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log(janelaAtual)
        console.log(usuarioLogado.id)
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
                // window.location.href = '';
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