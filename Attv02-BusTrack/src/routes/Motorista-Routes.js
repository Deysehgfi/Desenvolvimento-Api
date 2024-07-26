import { Router } from "express";

const router = Router()

import {cadastrarMotorista, getMotoristas, buscarMotorista, deletarMotorista} from "../controllers/Motorista-Controllers.js"

router.get("/", getMotoristas);
router.post("/cadastrar", cadastrarMotorista);
router.get("/:id", buscarMotorista);
router.delete("/deletar/:id", deletarMotorista)


export default router;