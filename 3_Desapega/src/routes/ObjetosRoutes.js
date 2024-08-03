import { Router } from "express";

import { create } from "../controllers/ObjetoControllers.js";
import verifyToken from "../helpers/verify-Token.js";
import imageUpload from "../helpers/upload-image.js";

const router = Router()

router.post("/create", verifyToken, imageUpload.array("imagens", 10), create)

//listar todas as imagens de um objeto
//listar todas as imagens que pertencen a um usuario

router.get("/usuarios/imagens",verifyToken, getAllObjectUSer)
export default router;