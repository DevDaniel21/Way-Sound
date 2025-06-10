import Musica from "../models/Musica.js"
const { Op } = require('sequelize');

class MusicaController {
    async store(req, res) {
        const { nome, autor, foto, audio } = req.body
        try {
            const musica = await Musica.create({ nome, autor, foto, audio })
            console.log(musica)
            return res.status(201).json(musica)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar música' })
        }
    }

    async index(req, res) {
        try {
            const musicas = await Musica.findAll()
            return res.status(200).json(musicas)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar músicas' })
        }
    }

    async show(req, res) {
        const { nome } = req.params
        try {
            const musica = await Musica.findOne({ where: { nome } })
            if (!musica) {
                return res.status(404).json({ error: 'Música não encontrada' })
            }
            return res.status(200).json(musica)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar música' })
        }
    }

    async search(req, res) {
        const { nome } = req.query
        try {
            const musicas = await Musica.findAll({
                where: {
                    nome: {
                        [Op.like]: `%${nome}%`
                    }
                }
            })

            if (musicas.length === 0) {
                return res.status(404).json({ error: 'Nenhuma música encontrada' })
            }
            return res.status(200).json(musicas)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar músicas' })
        }
    }

    async update(req, res) {
        const { nome } = req.params
        const { foto, audio } = req.body
        try {
            const musica = await Musica.findOne({ where: { nome } })
            console.log(email)
            if (!musica) {
                return res.status(404).json({ error: 'Música não encontrada' })
            }
            musica.nome = nome || musica.nome
            musica.foto = foto || musica.foto
            musica.audio = audio || musica.audio
            await musica.save()
            return res.status(200).json(musica)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar música' })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            const musica = await Musica.findByPk(id)
            if (!musica) {
                return res.status(404).json({ error: 'Música não encontrada' })
            }
            await musica.destroy()
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar música' })
        }
    }
}

export default new MusicaController()
