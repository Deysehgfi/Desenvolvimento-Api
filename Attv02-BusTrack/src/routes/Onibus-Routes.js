import { Router } from "express";

const router = Router()


import {getOnibus, cadastrarOnibus, buscarOnibus} from "../controllers/Onibus-Controllers.js";

router.get("/", getOnibus);
router.post("/cadastarOnibus", cadastrarOnibus)
router.get("/buscarOnibus/:id", buscarOnibus)

export default router;