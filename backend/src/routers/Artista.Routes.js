import { Router } from 'express'
import artistaController from '../controllers/Artista.Controller.js'

const routerArtista = new Router()

routerArtista.get('/', artistaController.index)
routerArtista.post('/', artistaController.store)
routerArtista.get('/:email', artistaController.show)
routerArtista.put('/:email', artistaController.update)
routerArtista.delete('/:id', artistaController.delete)

export default routerArtista