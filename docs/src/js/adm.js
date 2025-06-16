// Espera o DOM carregar completamente antes de ativar os botões
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os botões de editar
    const botoesEditar = document.querySelectorAll(".btn-edit");
    const botoesExcluir = document.querySelectorAll(".btn-delete");
  
    // Adiciona evento de clique para todos os botões de editar
    botoesEditar.forEach((botao) => {
      botao.addEventListener("click", () => {
        const linha = botao.closest(".table-row");
        const dados = linha.querySelectorAll(".table-cell");
        const nome = dados[0]?.innerText;
        const infoExtra = dados[1]?.innerText;
  
        alert(`Editar: ${nome} - ${infoExtra}`);
        // Aqui você pode abrir um modal ou redirecionar para a edição real
      });
    });
  
    // Adiciona evento de clique para todos os botões de excluir
    botoesExcluir.forEach((botao) => {
      botao.addEventListener("click", () => {
        const linha = botao.closest(".table-row");
        const nome = linha.querySelector(".table-cell")?.innerText;
  
        const confirmar = confirm(`Tem certeza que deseja excluir "${nome}"?`);
        if (confirmar) {
          linha.remove(); // Remove a linha da tabela
          alert(`"${nome}" foi excluído com sucesso!`);
          // Aqui você poderia fazer uma requisição ao back-end para excluir no banco
        }
      });
    });
  });
  