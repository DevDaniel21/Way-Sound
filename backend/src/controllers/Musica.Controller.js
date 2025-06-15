import Musica from "../models/Musica.js"
const { Op } = require('sequelize');

class MusicaController {
    async store(req, res) {
        const { nome, autor, foto, audio, usuario_id } = req.body
        try {
            const musica = await Musica.create({ nome, autor, foto, audio, usuario_id })
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

    async showById(req, res) {
        const { id } = req.params
        try {
            const musica = await Musica.findOne({ where: { id } })
            if (!musica) {
                return res.status(404).json({ error: 'Música não encontrada' })
            }
            return res.status(200).json(musica)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar música' })
        }
    }

    async showMusicaUsuario(req, res) {
        const { usuario_id } = req.params;

        try {
            const musicas = await Musica.findAll({ where: { usuario_id: usuario_id } });
            return res.status(200).json(musicas);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar musicas do usuário' });
        }
    }

    async search(req, res) {
        const { nome } = req.params;
    
        try {
            if (!nome || nome.trim() === '') {
                return res.status(400).json({ error: 'Parâmetro "nome" é obrigatório' });
            }
    
            const musicas = await Musica.findAll({
                where: {
                    nome: {
                        [Op.like]: `${nome}%`
                    }
                }
            });
    
            return res.status(200).json(musicas); // mesmo se vazio
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao buscar músicas' });
        }
    }
    
    async update(req, res) {
        const { id } = req.params
        const { nome, foto, audio } = req.body
        try {
            const musica = await Musica.findOne({ where: { id } })
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
