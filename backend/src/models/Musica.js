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
}