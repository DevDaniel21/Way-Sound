import Sequelize, { Model } from 'sequelize'

export default class Artista extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
            avatar: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'artistas',
        }
    )
        return this
    }

    static associate(models) {
        this.belongsToMany(models.Musica, {
            through: 'Artista_Musica',
            foreignKey: 'artista_id',
            otherKey: 'musica_id',
        })
      }
}