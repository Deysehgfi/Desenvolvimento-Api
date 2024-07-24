import { Router } from "express";

const router = Router()

import {cadastrarMotorista, getMotoristas,buscarMotorista} from "../controllers/Motorista-Controllers.js"

router.get("/", getMotoristas);
router.post("/cadastrar", cadastrarMotorista);
router.get("/:id", buscarMotorista);


export default router;