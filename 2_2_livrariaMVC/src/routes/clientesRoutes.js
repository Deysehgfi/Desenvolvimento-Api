import {Router} from 'express'

const router = Router()
//import controllers
import {getCliente} from "../controllers/clientesControllers.js"

router.get("/", getCliente)



export default router;