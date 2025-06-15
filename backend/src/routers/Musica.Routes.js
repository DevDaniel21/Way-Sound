import { Router } from 'express'
import musicaController from '../controllers/Musica.Controller.js'

const routerMusica = new Router()

routerMusica.get('/', musicaController.index)
routerMusica.post('/', musicaController.store)
routerMusica.get('/:nome', musicaController.show)
routerMusica.get('/carregar/:id', musicaController.showById)
routerMusica.get('/usuario/:usuario_id', musicaController.showMusicaUsuario)
routerMusica.get('/search/:nome', musicaController.search)
routerMusica.put('/:id', musicaController.update)
routerMusica.delete('/:id', musicaController.delete)

export default routerMusica