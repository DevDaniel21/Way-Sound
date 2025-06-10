import { buscarUsuarioPorEmail, criarUsuario } from "./usuarioApi.js";

let usuarioAtivo = localStorage.getItem('Usuario');
console.log(usuarioAtivo)

if (!usuarioAtivo) {
    const lightbox = document.getElementById("alerta-conta");
    const lightboxFechar = document.getElementById("lightboxFechar");
    
    // BOTAO DE FECHAR
    if (lightbox) {
        lightboxFechar.addEventListener("click", function() {
          lightbox.classList.remove("active");
        })
        
        // ABRIR ALERTA
        const linkConta = document.querySelectorAll(".linkConta");
        linkConta.forEach((link) => {
          link.addEventListener("click", function () {
            lightbox.classList.add("active");
          });
        });
    
        // ABRIR ALERTA - BOTÃO DAS MÚSICAS
        const cardButtons = document.querySelectorAll(".card-button");
        cardButtons.forEach((button) => {
          button.addEventListener("click", function () {
            lightbox.classList.add("active");
          });
        });
    }
} else {
    const plano = document.getElementById('plano')
    if (plano) {
        plano.classList.add('usuario-ativo')
    }
    const perfil = document.getElementById('perfil')
    if (perfil) {
        perfil.classList.add('usuario-ativo')
    }
}

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

    const jaRegistrado = await buscarUsuarioPorEmail(email)

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
