import {Router} from 'express'

const router = Router()
//import controllers
import {getCliente, cadastrarCliente} from "../controllers/clientesControllers.js"

router.get("/", getCliente)
router.post("/criar" , cadastrarCliente)




export default router;