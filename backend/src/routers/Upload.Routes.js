import { Router } from "express"
import UploadController from "../controllers/Upload.Controller.js"

const routerUpload = new Router();

routerUpload.post("/", UploadController.index);
routerUpload.post("/imagem", UploadController.uploadImagem);
routerUpload.post("/audio", UploadController.uploadAudio);


export default routerUpload