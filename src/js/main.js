// ABRIR DROPDOWN PERFIL
const perfilIcon = document.getElementById('perfilIcon');
const perfilLinks = document.getElementById('perfilLinks');

perfilIcon.addEventListener('click', function () {
    if (perfilLinks.style.display == 'block') {
        perfilLinks.style.display = 'none';
    } else {
        perfilLinks.style.display = 'block';
    }
})
