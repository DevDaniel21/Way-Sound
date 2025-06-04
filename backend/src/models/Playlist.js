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
        }
    )
        return this
    }
}