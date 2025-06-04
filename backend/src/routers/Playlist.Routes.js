import { Router } from 'express'
import playlistController from '../controllers/Playlist.Controller.js'

const routerPlaylist = new Router()

routerPlaylist.get('/', playlistController.index)
routerPlaylist.post('/', playlistController.store)
routerPlaylist.get('/:email', playlistController.show)
routerPlaylist.put('/:email', playlistController.update)
routerPlaylist.delete('/:id', playlistController.delete)

export default routerPlaylist