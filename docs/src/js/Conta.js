const janelaAtual = window.location.pathname.split('/').pop();

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