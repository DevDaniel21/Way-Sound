import multer from 'multer';
import path from 'path';
import fs from 'fs';

class UploadController {
    index(req, res) {
        res.status(200).send({ message: "Rota de upload de imagem" });
    }

    async uploadImagem(req, res) {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, path.join(__dirname, '..', 'public', 'images'))
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '.jpg')
            }
        })
        
        const upload = multer({ storage }).single('file');
    
        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).send(err);
            } else if (err) {
                return res.status(500).send(err);
            }
    
            console.log(req.file.filename);
            const url = `../../../backend/src/public/images/${req.file.filename}`;
            console.log(url)
            
            res.status(200).send({ url });
        })
    }

    async uploadAudio(req, res) {
        const storage = multer.diskStorage({
            destination: function(req, file, cb) {
                cb(null, path.join(__dirname, '..', 'public', 'audios'))
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '.mp3')
            }
        })
        
        const upload = multer({ storage }).single('file');
    
        upload(req, res, function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).send(err);
            } else if (err) {
                return res.status(500).send(err);
            }
            
            console.log(req.file.filename);
            const url = `../../../backend/src/public/audios/${req.file.filename}`;
    
            return res.status(200).send({ url }); 
        })
    }
}

export default new UploadController();
