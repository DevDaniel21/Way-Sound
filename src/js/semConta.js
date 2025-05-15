let conta = false
let contaLogada = conta;

//  ABRIR ALERTA PARA LOGAR CONTA
if (!contaLogada) {
    const lightbox = document.getElementById('alerta-conta');
    const lightboxFechar = document.getElementById('lightboxFechar');
    
    // ABRIR ALERTA
    const linkConta = document.querySelectorAll('.linkConta');
    linkConta.forEach( ( link ) => {
        link.addEventListener('click', function () {
            lightbox.classList.add('active');
        })
    })
    
    // ABRIR ALERTA MUSICAS
    const musicasList = document.querySelectorAll('.musicas-card');
    console.log(musicasList)
    musicasList.forEach( ( musica ) => {
        musica.addEventListener('click', function () {
            lightbox.classList.add('active');
        })
    })
    
    // BOTAO DE FECHAR
    lightboxFechar.addEventListener('click', function () {
        lightbox.classList.remove('active');
    })

}
