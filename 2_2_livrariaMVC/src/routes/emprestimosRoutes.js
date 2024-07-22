import {Router } from 'express'

const router = Router()

import {getEmprestimos, criarEmprestimo} from '../controllers/emprestimosControllers.js'

router.get("/", getEmprestimos)
router.post("/criar", criarEmprestimo)


export default router;