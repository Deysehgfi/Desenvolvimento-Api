import { Router } from "express";

const router = Router()


import { getOnibus, cadastrarOnibus } from "../controllers/Onibus-Controllers.js";

router.get("/", getOnibus);
router.post("/cadastarOnibus" , cadastrarOnibus)

export default router;