import Album from "../models/Album.js"

class AlbumController {
    async store(req, res) {
        const { nome, descricao, avatar } = req.body
        try {
            const album = await Album.create({ nome, descricao, avatar })
            console.log(album)
            return res.status(201).json(album)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar album' })
        }
    }

    async index(req, res) {
        try {
            const albums = await Album.findAll()
            return res.status(200).json(albums)
        } catch (error) {
            console.error('Erro ao listar albums:', error)
            return res.status(500).json({ error: 'Erro ao listar albums' })
        }
    }

    async show(req, res) {
        const { nome } = req.params
        try {
            const album = await Album.findOne({ where: { nome } })
            if (!album) {
                return res.status(404).json({ error: 'Album não encontrado' })
            }
            return res.status(200).json(album)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar album' })
        }
    }

    async update(req, res) {
        const { nome } = req.params
        const { descricao, avatar } = req.body
        try {
            const album = await Album.findOne({ where: { nome } })
            console.log(email)
            if (!album) {
                return res.status(404).json({ error: 'Album não encontrado' })
            }
            album.nome = nome || album.nome
            album.descricao = descricao || album.descricao
            album.avatar = avatar || album.avatar
            await album.save()
            return res.status(200).json(album)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar album' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const album = await Album.findByPk(id)
            if (!album) {
                return res.status(404).json({ error: 'Album não encontrado' })
            }
            await album.destroy()
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar album' })
        }
    }
}

export default new AlbumController()
