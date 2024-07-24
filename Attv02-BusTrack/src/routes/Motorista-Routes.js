import { Router } from "express";

const router = Router()

import {cadastrarMotorista, getMotoristas} from "../controllers/Motorista-Controllers.js"

router.get("/", getMotoristas);
router.post("/cadastrar", cadastrarMotorista);


export default router;