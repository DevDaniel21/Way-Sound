import { Router } from 'express'
import playlistController from '../controllers/Playlist.Controller.js'

const routerPlaylist = new Router()

routerPlaylist.get('/', playlistController.index)
routerPlaylist.post('/', playlistController.store)
routerPlaylist.get('/:id', playlistController.show)
routerPlaylist.get('/:id/musicas', playlistController.showMusicas)
routerPlaylist.post('/:id/musicas', playlistController.addMusicas)
routerPlaylist.get('/usuario/:usuarioID', playlistController.showByUsuario)
routerPlaylist.put('/:id', playlistController.update)
routerPlaylist.delete('/:id', playlistController.delete)

export default routerPlaylist