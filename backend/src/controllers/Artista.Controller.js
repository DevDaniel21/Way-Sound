import Artista from "../models/Artista.js"

class ArtistaController {
    async store(req, res) {
        const { nome, email, senha } = req.body
        try {
            const artista = await Artista.create({ nome, email, senha })
            console.log(artista)
            return res.status(201).json(artista)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar artista' })
        }
    }

    async index(req, res) {
        try {
            const artistas = await Artista.findAll()
            return res.status(200).json(artistas)
        } catch (error) {
            console.error('Erro ao listar artistas:', error)
            return res.status(500).json({ error: 'Erro ao listar artistas' })
        }
    }

    async show(req, res) {
        const { email } = req.params
        try {
            const artista = await Artista.findOne({ where: { email } })
            if (!artista) {
                return res.status(404).json({ error: 'Artista não encontrado' })
            }
            return res.status(200).json(artista)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar artista' })
        }
    }

    async update(req, res) {
        const { email } = req.params
        const { nome, senha, avatar } = req.body
        try {
            const artista = await Artista.findOne({ where: { email } })
            console.log(email)
            if (!artista) {
                return res.status(404).json({ error: 'Artista não encontrado' })
            }
            artista.nome = nome || artista.nome
            artista.senha = senha || artista.senha
            artista.avatar = avatar || artista.avatar
            await artista.save()
            return res.status(200).json(artista)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar artista' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const artista = await Artista.findByPk(id)
            if (!artista) {
                return res.status(404).json({ error: 'Artista não encontrado' })
            }
            await artista.destroy()
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar artista' })
        }
    }
}

export default new ArtistaController()
