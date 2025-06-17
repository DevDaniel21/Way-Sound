import { atualizarUsuario, buscarUsuarioPorEmail, criarUsuario, deletarUsuario } from "./usuarioApi.js";
import { buscarMusicaPorId } from "./musicaApi.js";

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
    const janelaAtual = window.location.pathname.split('/').pop();
    const dados = await carregarDadosDoBanco();

    const container = document.getElementById('data-container');
    if (!container) {
        // console.error('Elemento com ID "data-container" não encontrado.');
        return;
    }

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

// CARREGAR ICONES DE PERFIL OU ALERTA PARA ENTRAR EM CONTA
document.addEventListener('DOMContentLoaded', () => {
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
                link.classList.add("desativado");
                link.addEventListener("click", (e) => {
                  e.preventDefault();
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
        if (entrar) entrar.style.display='none'

        const plano = document.getElementById('plano')
        if (plano) plano.classList.add('usuario-ativo')
        
        const perfil = document.getElementById('perfil')
        if (perfil) perfil.classList.add('usuario-ativo')
        
        const sair = document.getElementById('sair');
        if (sair) sair.addEventListener('click', () => {
            localStorage.removeItem('Usuario'); 
        })

        // ABRIR DROPDOWN PERFIL
        const perfilLinks = document.getElementById("perfilLinks");

        if (perfilLinks && perfil) perfil.addEventListener("click", function () {
            if (perfilLinks.style.display == "block") {
            perfilLinks.style.display = "none";
            } else {
            perfilLinks.style.display = "block";
            }
        });

        // FECHAR O DROPDOWN AO CLICAR FORA
        if (perfil) document.addEventListener("click", function (event) {
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
// CARREGAR CONFIGURAÇÃO
async function loadConfig() {
    const usuarioAtivo = localStorage.getItem('Usuario');
    const usuario = await buscarUsuarioPorEmail(usuarioAtivo);

    let nome = usuario.nome;
    let email = usuario.email;
    let avatar = usuario.avatar;
    if (avatar == null) {
        avatar = '../../imgs/perfil.svg'
    }

    document.getElementById('name').value = nome;
    document.getElementById('email').value = email;
    if (avatar != '../../imgs/perfil.svg') {
        document.getElementById('profile-img').style.backgroundImage = `url(${avatar})`
    }
}

// ATUALIZAR O USUARIO
async function handleUpdateSubmit(e) {
    e.preventDefault()
    const usuarioAtivo = localStorage.getItem('Usuario');
    const usuario = await buscarUsuarioPorEmail(usuarioAtivo);

    let email = usuario.email;
    let avatarAntigo = usuario.avatar;
    let avatar = null

    let nomeEscolhido = document.getElementById("name").value;
    if (nomeEscolhido.trim() == '') nomeEscolhido = usuario.nome;

    let senhaEscolhido = document.getElementById("senha").value;
    if (senhaEscolhido.trim() == '') senhaEscolhido = usuario.senha;

    const inputDeImagem = document.getElementById('upload-btn').files[0]
    if (inputDeImagem != undefined) {
        const formDataImg = new FormData();
        formDataImg.append('file', document.getElementById('upload-btn').files[0]);
        const resImg = await fetch('http://localhost:4000/upload/imagem', {
            method: 'POST',
            body: formDataImg
        });
        const imgData = await resImg.json();
        avatar = imgData.url;
    } else {
        avatar = avatarAntigo;
    }


    try {
        const usuarioAtualizado = await atualizarUsuario(email, nomeEscolhido, senhaEscolhido, avatar);
        alert("Usuário atualizado com sucesso!")
        localStorage.setItem('Usuario', email)
    } catch (error) {
        console.log(error)
        alert("Erro ao atualizar usuário.");
        localStorage.setItem('Erro', JSON.stringify(error))
    }
}

// DELETAR CONTA
async function handleDeleteUser(e) {
    e.preventDefault()
    const usuarioAtivo = localStorage.getItem('Usuario');
    const usuario = await buscarUsuarioPorEmail(usuarioAtivo);
    
    let id = usuario.id;
    
    try {
        const usuarioDeletado = await deletarUsuario(id);
        alert("Usuário deletado com sucesso!");
        localStorage.removeItem('Usuario');
        window.location.href = '../../index.html';
    } catch (error) {
        console.log(error)
        alert("Erro ao deletar usuário.");
    }
}

// Inicialização do listener
document.addEventListener("DOMContentLoaded", function () {
    // CARREGAR O BOTAO DE LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", handleLoginSubmit);
    // CARREGAR O BOTAO DE REGISTRAR
    const registerForm = document.getElementById("registerForm");
    if (registerForm) registerForm.addEventListener("submit", handleRegisterSubmit);
    // CARREGAR O BOTAO DE UPDATE
    const updateForm = document.getElementById("updateForm");
    if (updateForm) updateForm.addEventListener("submit", handleUpdateSubmit);
    // CARREGAR O BOTAO DE DELETAR
    const deleteUserBtn = document.getElementById("deleteUserBtn");
    if (deleteUserBtn) deleteUserBtn.addEventListener("click", handleDeleteUser);
    // CARREGAR CONFIG
    const janelaAtual = window.location.pathname.split('/').pop();
    if (janelaAtual == 'config-user.html') loadConfig()

    // CARREGAR PLAYER
    if (usuarioAtivo) {
        // CARREGAR DIVS DA MÚSICA
        const playerIcon = document.querySelector('.playerIcon img');
        const playerTitulo = document.getElementById('playerMusic-titulo')
        const playerSubtitulo = document.getElementById('playerMusic-subtitulo')
        // const teste = document.getElementById('')
        // TROCAR MUSICA
        const musicaIndex = document.querySelectorAll('.musicas-card');
        if (musicaIndex) musicaIndex.forEach( (e) => {
            e.addEventListener('click', async () => {
                try {
                    const id = parseInt(e.getAttribute('data-id'))
                    const musica = await buscarMusicaPorId(id)
                    console.log(musica)

                    const audioDesejado = musica.audio;
                    const audio = document.getElementById('audioSite');
                    audio.src = audioDesejado;

                    // TOCAR
                    playDisplay.click();
                    // ATUALIZAR DISPLAY
                    playerIcon.src = musica.foto;
                    playerTitulo.innerHTML = musica.nome;
                    playerSubtitulo.innerHTML = musica.autor;

                    playerTitulo.classList.remove('esqueleto')
                    playerSubtitulo.classList.remove('esqueleto')
                } catch (error) {
                    console.log(error);
                }
            })
        })

        // CARREGAR BOTOES
        const playDisplay = document.getElementById('play');
        const audioAtual = document.getElementById('audioSite');
        playDisplay.addEventListener('click', () => {
            if (audioAtual.src != null) {
                audioAtual.play();
                playDisplay.style.display = 'none'
                pauseDisplay.style.display = 'flex'
            }
        })
        const pauseDisplay = document.getElementById('pause');
        pauseDisplay.addEventListener('click', () => {
            audioAtual.pause()
            playDisplay.style.display = 'flex'
            pauseDisplay.style.display = 'none'
        })

        // CARREGAR TEMPO
        const audio = document.getElementById('audioSite');
        const tempoTotal = document.getElementById('tempoTotal');
        const tempoAtual = document.getElementById('tempoAtual');
        const barraProgresso = document.getElementById('barraProgresso');

        function formatarTempo(segundos) {
            let min = Math.floor(segundos / 60);
            let seg = Math.floor(segundos % 60);
            if (seg < 10) seg = '0' + seg;
            return `${min}:${seg}`;
        }

        if (audio) audio.addEventListener('loadedmetadata', function () {
            tempoTotal.textContent = `${formatarTempo(audio.duration)}`;
            barraProgresso.style.width = '0%';
        });

        if (audio) audio.addEventListener('timeupdate', function () {
            tempoAtual.textContent = `${formatarTempo(audio.currentTime)}`;
            let percentual = (audio.currentTime / audio.duration) * 100;
            barraProgresso.style.width = percentual + '%';
        });
    }
});

export { usuarioAtivo }