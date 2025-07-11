import { Sequelize } from 'sequelize'
import databaseConfig from '../config/Database.js'
import Usuario from '../models/Usuario.js'
import Musica from '../models/Musica.js'
import Artista from '../models/Artista.js'
import Playlist from '../models/Playlist.js'
import Album from '../models/Album.js'

const models = [Usuario, Musica, Artista, Playlist, Album]

class ModelConnection {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
        
        this.connection.sync({ alter: true })
    }
}

export default new ModelConnection()
