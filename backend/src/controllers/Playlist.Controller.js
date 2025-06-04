import Playlist from "../models/Playlist.js"

class PlaylistController {
    async store(req, res) {
        const { nome, descricao, avatar } = req.body
        try {
            const playlist = await Playlist.create({ nome, descricao, avatar })
            console.log(playlist)
            return res.status(201).json(playlist)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar playlist' })
        }
    }

    async index(req, res) {
        try {
            const playlists = await Playlist.findAll()
            return res.status(200).json(playlists)
        } catch (error) {
            console.error('Erro ao listar playlists:', error)
            return res.status(500).json({ error: 'Erro ao listar playlists' })
        }
    }

    async show(req, res) {
        const { nome } = req.params
        try {
            const playlist = await Playlist.findOne({ where: { nome } })
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist não encontrado' })
            }
            return res.status(200).json(playlist)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar playlist' })
        }
    }

    async update(req, res) {
        const { nome } = req.params
        const { descricao, avatar } = req.body
        try {
            const playlist = await Playlist.findOne({ where: { nome } })
            console.log(email)
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist não encontrado' })
            }
            playlist.nome = nome || playlist.nome
            playlist.descricao = descricao || playlist.descricao
            playlist.avatar = avatar || playlist.avatar
            await playlist.save()
            return res.status(200).json(playlist)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar playlist' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const playlist = await Playlist.findByPk(id)
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist não encontrado' })
            }
            await playlist.destroy()
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar playlist' })
        }
    }
}

export default new PlaylistController()
