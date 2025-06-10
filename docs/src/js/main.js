// ABRIR DROPDOWN PERFIL
const perfilIcon = document.getElementById("perfilIcon");
const perfilLinks = document.getElementById("perfilLinks");

if (perfilIcon) {
  perfilIcon.addEventListener("click", function () {
    if (perfilLinks.style.display == "block") {
      perfilLinks.style.display = "none";
    } else {
      perfilLinks.style.display = "block";
    }
  });
}

// FECHAR O DROPDOWN AO CLICAR FORA
document.addEventListener("click", function (event) {
  const isClickInside =
    perfilIcon.contains(event.target) || perfilLinks.contains(event.target);

  if (!isClickInside) {
    perfilLinks.style.display = "none";
  }
});


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

  dados.forEach(item => {
    const p = document.createElement('p');
    p.textContent = item.nome || JSON.stringify(item);
    container.appendChild(p);
  });

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