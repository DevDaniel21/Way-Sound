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
}