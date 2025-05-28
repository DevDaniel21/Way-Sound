export class MusicaModel {
    musicas = []
    constructor(nome, artista, foto, audio) {
        this.nome = nome;
        this.artista = artista;
        this.foto = foto;
        this.audio = audio;
    }

    generateId() {
        
    }
    
    updateLocalStorageMusicas() {
        localStorage.setItem('Musicas', JSON.stringify(musicasTotal));
    }

    check(nome) {
        if (nome === '') {
            return 'Insira um nome válido!';
        } else {
            const jaCadastrado = musicas.some(musica => musica.nome === nome);
            return !jaCadastrado;
        }
    }

    add() {
        event.preventDefault();
    
        let nomeMusica = document.getElementById('nomeMusica').value;
        let nomeArtista = document.getElementById('nomeArtista').value;
        let imgUrl = document.getElementById('imgUrl').files[0];
        let musicaAudio = document.getElementById('musicaAudio').files[0];
    
        let disponivel = this.check(nomeMusica);
    
        if (nomeMusica !== '' && disponivel === true && nomeArtista !== '' && imgUrl && musicaAudio) {
            const urlImg = URL.createObjectURL(imgUrl);
            const urlAudio = URL.createObjectURL(musicaAudio);
    
            let id = musicas.length + 1;
            musicas.push(new MusicaModel(nomeMusica, nomeArtista, urlImg, urlAudio, id));
            this.updateLocalStorageMusicas();
    
            alert('Música cadastrada com sucesso!');
            return true
        } else if (nomeMusica === '') {
            alert('Insira o nome da música!');
        } else if (disponivel !== true) {
            alert('Essa música já existe!');
        } else if (nomeArtista === '') {
            alert('Insira o nome do artista!');
        } else if (!imgUrl) {
            alert('Envie uma imagem!');
        } else if (!musicaAudio) {
            alert('Envie um arquivo de áudio!');
        }
    }

    delete(musica) {
    }

    carregarMusicas() {
        const dados = JSON.parse(localStorage.getItem('Musicas'));
        musicasTotal.push(dados)
    }

    listMusicas() {
        return musicasTotal
    }
}

let musicas = [
    new MusicaModel('Denial is a river', 'Doechii', 'url(https://i.ytimg.com/vi/2csOMGFFgJ0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB11nm0Cnjt67qYxpdyTaTcifsdow)', null),
    new MusicaModel('Resenha do arrocha', 'J. Eskine', 'url(https://i.scdn.co/image/ab67616d0000b273b95ec67486445b1c81e55b32)', null),
    new MusicaModel('Última noite', 'Léo Foguete', 'url(https://akamai.sscdn.co/letras/360x360/albuns/f/7/d/c/2475161734385435.jpg)', null),
    new MusicaModel('Oh garota eu qu...', 'Oruam, Zé Felipe, MC Rodrigo do CN, MC Tuto', 'url(https://cdn-images.dzcdn.net/images/cover/5dc1617ec4b0aae08e259139fa616df6/0x1900-000000-80-0-0.jpg)', null),
    new MusicaModel('Coração partido', 'Grupo Menos é Mais', 'url(https://i.scdn.co/image/ab67616d0000b273ebdb1b9e90bc232b97a48410)', null),
];
let musicasTotal = musicas.slice()

// const musicaModel = new MusicaModel(); Parece que funciona sem isso
// Sequelize para interação com MySQL