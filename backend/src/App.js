import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import './database/ModelConnection.js'
import homeRoutes from './routers/Home.Routes.js'
import usuarioRoutes from './routers/Usuario.Routes.js'
import musicaRoutes from './routers/Musica.Routes.js'
import artistaRoutes from './routers/Artista.Routes.js'
import playlistRoutes from './routers/Playlist.Routes.js'
import albumRoutes from './routers/Album.Routes.js'

dotenv.config()

class App {
    constructor() {
        this.app = express()
        this.middlawares()
        this.routes()
    }

    middlawares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes() {
        this.app.use('/', homeRoutes)
        this.app.use('/usuario', usuarioRoutes)
        this.app.use('/musica', musicaRoutes)
        this.app.use('/artista', artistaRoutes)
        this.app.use('/playlist', playlistRoutes)
        this.app.use('/album', albumRoutes)
    }
}

export default new App().app
