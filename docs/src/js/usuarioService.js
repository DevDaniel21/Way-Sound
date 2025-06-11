import { buscarUsuarioPorEmail, criarUsuario } from "./usuarioApi.js";

let usuarioAtivo = localStorage.getItem('Usuario');

// TELA DE CARREGAMENTO
async function carregarDadosDoBanco() {
    try {
      const resposta = await fetch('http://localhost:4000/musica');
      if (!resposta.ok) throw new Error("Erro ao carregar dados");
      const dados = await resposta.json();
      return dados;
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      return [];
    }
  }
  
  async function iniciarSite() {
    const dados = await carregarDadosDoBanco();
  
    const container = document.getElementById('data-container');
    if (!container) {
      console.error('Elemento com ID "data-container" não encontrado.');
      return;
    }
  
        console.log(dados[0])

        for(i = 0; i < 10; i++) {
            dados[i]
            nome = dados[i].nome
        }
    //   const p = document.createElement('p');
    //   p.textContent = nome || JSON.stringify(item);
    //   artistasList.appendChild(p);  

    // <li class="artistas-card">
    //     <figure
    //     style="background-image: url(https://portalperifacon.com/wp-content/uploads/2024/09/imagem-2-1.jpg);"
    //     class="artistas-card-img"></figure>
    //     <p class="artistas-card-titulo">${nome}</p>
    //     <p class="artistas-card-subtitulo">Artista</p>
    // </li>


    document.getElementById('loading-screen')?.classList.add("inativo");
    document.getElementById('container')?.classList.add("ativo");
  }
  
  iniciarSite();
  
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
  
    loadingScreen?.classList.add('fade-out');
  
    setTimeout(() => {
      loadingScreen?.classList.add("inativo");
      mainContent?.classList.add("ativo");
    }, 5000);
  });

document.addEventListener('DOMContentLoaded', () => {
    // Coloca aqui para aparecer a tela

    if (usuarioAtivo == null) {
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
        // USUARIO LOGADO
        const entrar = document.getElementById('entrar');
        entrar.style.display = 'none'

        const plano = document.getElementById('plano')
        plano.classList.add('usuario-ativo')
        
        const perfil = document.getElementById('perfil')
        perfil.classList.add('usuario-ativo')
        
        const sair = document.getElementById('sair');
        sair.addEventListener('click', () => {localStorage.removeItem('Usuario')})
        
        // ABRIR DROPDOWN PERFIL
        const perfilLinks = document.getElementById("perfilLinks");

        perfil.addEventListener("click", function () {
            if (perfilLinks.style.display == "block") {
            perfilLinks.style.display = "none";
            } else {
            perfilLinks.style.display = "block";
            }
        });

        // FECHAR O DROPDOWN AO CLICAR FORA
        document.addEventListener("click", function (event) {
        const isClickInside =
            perfil.contains(event.target) || perfilLinks.contains(event.target);

        if (!isClickInside) {
            perfilLinks.style.display = "none";
        }
        });
    }
})


// PARTE DE LOGIN
async function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const usuario = await buscarUsuarioPorEmail(email);
    
    if (usuario && usuario.senha === senha) {
        alert(`Bem-vindo, ${usuario.nome || "usuário"}!`);
        localStorage.setItem('Usuario', usuario.email)
        window.location.href = '../../index.html'
    } else {
        alert("Usuário ou senha inválidos.");
    }
}

// PARTE DE REGISTRAR
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
            window.location.href = '../../index.html'
        } catch (error) {
            alert("Erro ao cadastrar usuário.");
        }
    } else {
        alert("Erro ao cadastrar usuário.");
    }
}

// Inicialização do listener
document.addEventListener("DOMContentLoaded", function () {
    // CARREGAR O BOTAO DE LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }
    // CARREGAR O BOTAO DE REGISTRAR
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }
});
