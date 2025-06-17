import Sequelize, { Model } from 'sequelize'

export default class Musica extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      autor: Sequelize.STRING,
      foto: Sequelize.STRING,
      audio: Sequelize.STRING,
    }, {
      sequelize,
      tableName: 'musicas',
    })
    return this
  }

  static associate(models) {
    this.belongsToMany(models.Playlist, {
      through: 'PlaylistMusica',
      as: 'Playlists',
      foreignKey: 'musica_id'
    });

    this.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    });

    this.belongsToMany(models.Album, {
      through: 'Album_Musica',
      foreignKey: 'musica_id',    // deve ser musica_id aqui, não artista_id
      otherKey: 'album_id',
    });
  }
}
