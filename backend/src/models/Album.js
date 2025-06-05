import Sequelize, { Model } from 'sequelize'

export default class Album extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            descricao: Sequelize.STRING,
            avatar: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'albums',
        }
    )
        return this
    }

    static associate(models) {
        this.belongsToMany(models.Musica, {
          through: 'Album_Musica',
          foreignKey: 'musica_id',
          otherKey: 'album_id',
        })

        this.belongsToMany(models.Artista, {
          through: 'Album_Artista',
          foreignKey: 'artista_id',
          otherKey: 'album_id',
        })
      }
}