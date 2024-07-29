import { Router } from "express";

const router = Router()

import { getLinhaOnibus, criarLinha, buscarLinha, editarLinha } from "../controllers/LinhaOnibus-Controllers.js"


router.get("/", getLinhaOnibus);
router.post("/criar", criarLinha);
router.get("/:id", buscarLinha);
router.put("/editar/:id", editarLinha);

export default router;