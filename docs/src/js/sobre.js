const membros = {
    rafael: {
        nome: "Rafael Staine",
        funcao: "Front-end Developer",
        email: "rafael@email.com",
        desc: "Responsável pela interface visual e usabilidade do projeto.",
        img: "https://i.pinimg.com/736x/b7/98/27/b798278394fcfeabbc9d65a38d8f996e.jpg"
    },
    daniel: {
        nome: "Daniel Custoodio Santana",
        funcao: "Full-Stack",
        email: "daniel@email.com",
        desc: "Cuida da lógica de dados, banco e integrações.",
        img: "https://i.pinimg.com/736x/d5/5f/42/d55f42c1edee2c7f60b803a51f0f17df.jpg"
    },
    ws: {
        nome: "WeSlley dA Paz Souza",
        funcao: "Gerente de Projeto",
        email: "weslley@email.com",
        desc: "Organiza as entregas e define o escopo do projeto.",
        img: "../../imgs/logos/logo-pequena.png"
    },
    cassio: {
        nome: "Cássio Jhonatan",
        funcao: "UX Designer",
        email: "cassio@email.com",
        desc: "Foca na experiência do usuário e nas interações.",
        img: "https://i.pinimg.com/736x/56/e1/a5/56e1a5c5bf14727f65c39842a3ac9ba0.jpg"
    },
    matheus: {
        nome: "Matheus Bugatti",
        funcao: "QA Tester",
        email: "matheus@email.com",
        desc: "Testa e garante a qualidade das funcionalidades.",
        img: "https://i.pinimg.com/736x/dd/1b/ef/dd1bef95a6ddad07a858b10617664c81.jpg"
    }
};

function abrirModal(id) {
    const membro = membros[id];
    document.getElementById("modal-nome").textContent = membro.nome;
    document.getElementById("modal-funcao").textContent = "Função: " + membro.funcao;
    document.getElementById("modal-email").textContent = "Email: " + membro.email;
    document.getElementById("modal-desc").textContent = membro.desc;
    document.getElementById("modal-img").src = membro.img;

    document.getElementById("modal-bg").classList.remove("hidden");
}

function fecharModal() {
    document.getElementById("modal-bg").classList.add("hidden");
}