// ========================
// VARIÁVEIS E ELEMENTOS
// ========================
const uploadBtn = document.getElementById('upload-btn');
const profileImgDiv = document.getElementById('profile-img');
const deleteBtn = document.getElementById('delete-btn');

const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const saveBtn = document.getElementById('btn-save-config');

// ========================
// FUNÇÃO: Carrega dados salvos
// ========================
function loadUserData() {
    const savedImage = localStorage.getItem('profileImage');
    const savedName = localStorage.getItem('name');
    const savedUsername = localStorage.getItem('username');
    const savedEmail = localStorage.getItem('email');
    const savedPhone = localStorage.getItem('phone');

    if (savedImage) profileImgDiv.innerHTML = `<img src="${savedImage}" alt="Imagem de Perfil">`;
    if (savedName) nameInput.value = savedName;
    if (savedUsername) usernameInput.value = savedUsername;
    if (savedEmail) emailInput.value = savedEmail;
    if (savedPhone) phoneInput.value = savedPhone;
}
loadUserData();

// ========================
// Upload e salvar imagem
// ========================
uploadBtn.addEventListener('change', function () {
    const file = this.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageDataUrl = e.target.result;
            profileImgDiv.innerHTML = `<img src="${imageDataUrl}" alt="Imagem de Perfil">`;
            localStorage.setItem('profileImage', imageDataUrl);
        };
        reader.readAsDataURL(file);
    } else {
        console.warn("Arquivo selecionado não é uma imagem.");
    }
});

// ========================
// Remover imagem
// ========================
deleteBtn.addEventListener('click', function () {
    profileImgDiv.innerHTML = '';
    localStorage.removeItem('profileImage');
});

// ========================
// Salvar alterações
// ========================
saveBtn.addEventListener('click', () => {
    // Nome
    if (nameInput.value.trim() !== "") {
        localStorage.setItem('name', nameInput.value.trim());
    } else {
        localStorage.removeItem('name');
    }

    // Nome de usuário
    if (usernameInput.value.trim() !== "") {
        localStorage.setItem('username', usernameInput.value.trim());
    } else {
        localStorage.removeItem('username');
    }

    // Email
    if (emailInput.value.trim() !== "") {
        localStorage.setItem('email', emailInput.value.trim());
    } else {
        localStorage.removeItem('email');
    }

    // Telefone
    if (phoneInput.value.trim() !== "") {
        localStorage.setItem('phone', phoneInput.value.trim());
    } else {
        localStorage.removeItem('phone');
    }
});