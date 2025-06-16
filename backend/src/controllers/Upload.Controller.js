import multer from 'multer';
import path from 'path';
import fs from 'fs';

class UploadController {
    index(req, res) {
        res.status(200).send({ message: "Rota de upload de imagem" });
    }

    uploadImagem(req, res) {
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
    
            return res.status(200).send({ message: 'Upload realizado com sucesso'});
        })
    }

    uploadAudio(req, res) {
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
    
            return res.status(200).send({ message: 'Upload realizado com sucesso'});
        })
    }
}

export default new UploadController();
