const uploadBtn = document.getElementById('upload-btn');
const profileImgDiv = document.getElementById('profile-img');
const deleteBtn = document.getElementById('delete-btn'); // botão de excluir

// Carrega a imagem salva ao iniciar
const savedImage = localStorage.getItem('profileImage');
if (savedImage) {
  profileImgDiv.innerHTML = `<img src="${savedImage}" alt="Imagem de Perfil">`;
}

// Quando o usuário envia uma nova imagem
uploadBtn.addEventListener('change', function () {
  const file = this.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageDataUrl = e.target.result;
      profileImgDiv.innerHTML = `<img src="${imageDataUrl}" alt="Imagem de Perfil">`;

      // Salva no localStorage
      localStorage.setItem('profileImage', imageDataUrl);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Por favor, selecione um arquivo de imagem.");
  }
});

// Evento para excluir a imagem
deleteBtn.addEventListener('click', function () {
  // Limpa a div da imagem
  profileImgDiv.innerHTML = '';

  // Remove a imagem do localStorage
  localStorage.removeItem('profileImage');
});