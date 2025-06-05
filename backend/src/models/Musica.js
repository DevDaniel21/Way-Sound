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
        }
    )
        return this
    }
    
    static associate(models) {
        this.belongsToMany(models.Playlist, {
          through: 'Playlist_Musica',
          foreignKey: 'musica_id',
          otherKey: 'playlist_id',
        })
        
        this.belongsToMany(models.Artista, {
            through: 'Artista_Musica',
            foreignKey: 'artista_id',
            otherKey: 'musica_id',
        })

        this.belongsToMany(models.Album, {
            through: 'Album_Musica',
            foreignKey: 'artista_id',
            otherKey: 'album_id',
        })
      }
}