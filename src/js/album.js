// ABRIR DROPDOWN PERFIL
const perfilIcon = document.getElementById("perfilIcon");
const perfilLinks = document.getElementById("perfilLinks");

perfilIcon.addEventListener("click", function () {
  if (perfilLinks.style.display == "block") {
    perfilLinks.style.display = "none";
  } else {
    perfilLinks.style.display = "block";
  }
});

// FECHAR O DROPDOWN AO CLICAR FORA
document.addEventListener("click", function (event) {
  const isClickInside =
    perfilIcon.contains(event.target) || perfilLinks.contains(event.target);

  if (!isClickInside) {
    perfilLinks.style.display = "none";
  }
});