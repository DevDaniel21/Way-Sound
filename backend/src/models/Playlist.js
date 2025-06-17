import Sequelize, { Model } from 'sequelize'

export default class Playlist extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      descricao: Sequelize.STRING,
      avatar: Sequelize.STRING,
    }, {
      sequelize,
      tableName: 'playlists',
    })
    return this
  }

  static associate(models) {
    this.belongsToMany(models.Musica, {
      through: 'PlaylistMusica',   // corrigido nome da tabela intermediária
      as: 'Musicas',               // definir alias para usar addMusicas, getMusicas, etc
      foreignKey: 'playlist_id',
      otherKey: 'musica_id',
    })

    this.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',
    })
  }
}
