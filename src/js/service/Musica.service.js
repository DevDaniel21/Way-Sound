import { MusicaModel } from '../models/Musica.model.js'
import { MusicaView } from '../view/Musica.view.js'

const musicaModel = new MusicaModel();
const musicaView = new MusicaView();

// Abre o popup
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
}

// Fecha o popup
export function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    clearFields();
}

// Limpa os campos
function clearFields() {
    document.getElementById('imgUrl').value = '';
    document.getElementById('nomeMusica').value = '';
    document.getElementById('nomeArtista').value = '';
    document.getElementById('musicaAudio').value = '';
}

// Eventos
if (window.location.pathname == '/src/html/publicacoes.html') {
    document.getElementById('publicar').addEventListener('click', openPopup);
    document.getElementById('btn-add').addEventListener('click', () => {
        if (musicaModel.add() == true) {
            musicaView.renderPublicar(musicaModel.listMusicas());
            closePopup();
        }
    });
    document.getElementById('btn-cancel').addEventListener('click', closePopup);
}

// Inicialização
musicaModel.carregarMusicas();
window.location.pathname != '/src/html/publicacoes.html'? musicaView.renderMusicas(musicaModel.listMusicas()): musicaView.renderPublicar(musicaModel.listMusicas());