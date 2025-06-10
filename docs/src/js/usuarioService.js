import { buscarUsuarioPorEmail, criarUsuario } from "./usuarioApi.js";

async function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const usuario = await buscarUsuarioPorEmail(email);
    
    if (usuario && usuario.senha === senha) {
        alert(`Bem-vindo, ${usuario.nome || "usuário"}!`);
        localStorage.setItem('Usuario', usuario.email)
        window.location.href = './exemplo.html'
    } else {
        alert("Usuário ou senha inválidos.");
    }
}

async function handleRegisterSubmit(e) {
    e.preventDefault();
    const nome = document.getElementById("regUsuario").value;
    const email = document.getElementById("regEmail").value;
    const senha = document.getElementById("regSenha").value;


    if (jaRegistrado.email != email) {
        try {
            const usuario = await criarUsuario(nome, email, senha);
            alert("Cadastro realizado com sucesso!");
            localStorage.setItem('Usuario', usuario.email)
            window.location.href = './exemplo.html'
        } catch (error) {
            alert("Erro ao cadastrar usuário.");
        }
    } else {
        alert("Erro ao cadastrar usuário.");
    }
}

// Inicialização do listener
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }
});
