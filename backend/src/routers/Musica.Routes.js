import { Router } from 'express'
import musicaController from '../controllers/Musica.Controller.js'

const routerMusica = new Router()

routerMusica.get('/', musicaController.index)
routerMusica.post('/', musicaController.store)
routerMusica.get('/:nome', musicaController.show)
routerMusica.get('/search', musicaController.search)
routerMusica.put('/:nome', musicaController.update)
routerMusica.delete('/:id', musicaController.delete)

export default routerMusica