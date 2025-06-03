let conta = false;
let contaLogada = conta;

//  ABRIR ALERTA PARA LOGAR CONTA
if (!contaLogada) {
  const lightbox = document.getElementById("alerta-conta");
  const lightboxFechar = document.getElementById("lightboxFechar");
  
  // BOTAO DE FECHAR
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

  // ABRIR ALERTA MUSICAS
  // const musicasList = document.querySelectorAll(".musicas-card");
  // console.log(musicasList);
  // musicasList.forEach((musica) => {
  //   musica.addEventListener("click", function () {
  //     lightbox.classList.add("active");
  //   });
  // });


  // ABRIR ALERTA - BOTÃO DAS MÚSICAS
  const cardButtons = document.querySelectorAll(".card-button");
  cardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      lightbox.classList.add("active");
    });
  });
}

// NÃO ESTAVA DANDO CERTO LINKAR O JS (MAIN) NO HTML DE PESQUISA, ENTÃO COLOQUEI O JS AQUI MESMO

//BOTÃO PLAY E PAUSE
const buttons = document.querySelectorAll(".btn-toggle");
buttons.forEach((button) => {
  const icon = button.querySelector(".icon-toggle");

  button.addEventListener("click", () => {
    if (icon.name === "play-outline") {
      icon.name = "pause-outline";
    } else {
      icon.name = "play-outline";
    }
  });
});

// BARRA DE PESQUISA
if (document.getElementById("pesquisaInput")) {
  document.getElementById("pesquisaInput").addEventListener("input", function () {
    const filtro = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card-music");
  
    cards.forEach((card) => {
      const titulo = card.querySelector(".text-music").textContent.toLowerCase();
      card.style.display = titulo.includes(filtro) ? "" : "none";
    });
  });
}
