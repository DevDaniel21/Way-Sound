export class MusicaModel {
  constructor(nome, artista, foto, audio, id = Date.now()) {
    this.id = id;
    this.nome = nome;
    this.artista = artista;
    this.foto = foto;
    this.audio = audio;
  }
}
