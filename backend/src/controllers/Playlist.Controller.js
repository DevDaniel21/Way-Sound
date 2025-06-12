import Playlist from "../models/Playlist.js"
import Usuario from "../models/Usuario.js"
import Musica from "../models/Musica.js"

class PlaylistController {
    async store(req, res) {
        const { usuarioId } = req.body; 

        try {
            // 1) valida usuário
            const usuario = await Usuario.findByPk(usuarioId);
            if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // 2) busca todas as playlists
            const playlists = await Playlist.findAll({
            where: { usuario_id: usuarioId }  // ou usuarioId, se tiver mapeado
            });

            // 3) cria nova playlist
            const novaPlaylist = await Playlist.create({
            nome: `Playlist nº ${playlists.length + 1}`,
            descricao: null,
            avatar: null,
            usuario_id: usuarioId
            });

            return res.status(201).json(novaPlaylist);

        } catch (error) {
            console.error('Erro ao criar playlist:', error);
            return res.status(500).json({ error: 'Erro ao criar playlist' });
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
        const { id } = req.params
        try {
            const playlist = await Playlist.findOne({ where: { id } })
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist não encontrado' })
            }
            return res.status(200).json(playlist)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar playlist' })
        }
    }

    async showByUsuario(req, res) {
        const { usuarioID } = req.params;

        try {
            const playlists = await Playlist.findAll({ where: { usuario_id: usuarioID } });
            return res.status(200).json(playlists);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar playlists do usuário' });
        }
    }

    async showMusicas(req, res) {
        const { id } = req.params
    
        try {
            const playlist = await Playlist.findByPk(id, {
                include: {
                    model: Musica,
                    through: { attributes: [] } // remove colunas da tabela intermediária da resposta
                }
            })
    
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist não encontrada' })
            }
            
            return res.status(200).json(playlist.Musicas) // ou playlist.musicas
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar músicas da playlist' })
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { nome, avatar } = req.body
    
        try {
            const [updated] = await Playlist.update(
                { nome, avatar },
                { where: { id } }
            )
    
            if (updated === 0) {
                return res.status(404).json({ error: 'Playlist não encontrada' })
            }
    
            const playlistAtualizada = await Playlist.findByPk(id)
            return res.status(200).json(playlistAtualizada)
        } catch (error) {
            console.error('Erro ao atualizar playlist:', error)
            return res.status(500).json({ error: 'Erro ao atualizar playlist' })
        }
    }
    

    async delete(req, res) {
        const { id } = req.params
        try {
            const playlist = await Playlist.findByPk(id)
            if (!playlist) {
                return res.status(404).json({ error: 'Playlist não encontrada' })
            }
            await playlist.destroy()
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar playlist' })
        }
    }
}

export default new PlaylistController()
