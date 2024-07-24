import { Router } from "express";

const router = Router()

import {getLinhaOnibus, criarLinha, buscarLinha} from "../controllers/LinhaOnibus-Controllers.js"


router.get("/", getLinhaOnibus);
router.post("/criar", criarLinha);
router.get("/:id", buscarLinha);

export default router;