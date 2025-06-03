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
document.getElementById("pesquisaInput").addEventListener("input", function () {
  const filtro = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card-music");

  cards.forEach((card) => {
    const titulo = card.querySelector(".text-music").textContent.toLowerCase();
    card.style.display = titulo.includes(filtro) ? "" : "none";
  });
});