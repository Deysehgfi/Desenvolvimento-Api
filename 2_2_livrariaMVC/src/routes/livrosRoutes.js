import {Router} from 'express'

const router = Router()
//import controllers
import {cadastrarLivro, getLivros, buscarLivro, editarLivro, deletarLivro} from "../controllers/livrosControllers.js"

router.get("/", getLivros)
router.post("/criar", cadastrarLivro)
router.get("/:id", buscarLivro)
router.put("/editar/:id", editarLivro)
router.delete("/delete/:id", deletarLivro)

export default router;