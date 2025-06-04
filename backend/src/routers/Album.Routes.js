import { Router } from 'express'
import albumController from '../controllers/Album.Controller.js'

const routerAlbum = new Router()

routerAlbum.get('/', albumController.index)
routerAlbum.post('/', albumController.store)
routerAlbum.get('/:nome', albumController.show)
routerAlbum.put('/:nome', albumController.update)
routerAlbum.delete('/:id', albumController.delete)

export default routerAlbum