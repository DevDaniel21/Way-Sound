let conta = false
let contaLogada = conta;

const linkConta = document.querySelectorAll('.linkConta')
const lightbox = document.getElementById('alerta-conta')
const lightboxFechar = document.getElementById('lightboxFechar')

if (!contaLogada) {
    linkConta.forEach( ( link ) => {
        link.addEventListener('click', function () {
            lightbox.classList.add('active');
        })
    })

    lightboxFechar.addEventListener('click', function () {
        lightbox.classList.remove('active')
    })
}




//href="src/html/livraria.html"