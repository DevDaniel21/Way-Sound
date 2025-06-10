let conta = false;
let contaLogada = conta;

//  ABRIR ALERTA PARA LOGAR CONTA
if (!contaLogada) {

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

