import { Router, request, response } from "express";


const router = Router()

//import helpers 
import validarUsuario from "../helpers/validar-user.js";

//localhost:4444/usuarios/registro

import { registrarUsuario, listarUsuarios, login, checkUser } from "../controllers/UsuariosController.js";

//login tipo post -> pois vai esta recebendo informação do body
//a validação vai ser executada primeiro antes de executar o controlador. e se estiver tudo validado executa o controlador
router.post("/register", validarUsuario, registrarUsuario)
router.post("/login", login)
router.get("/:id", checkUser)

router.get("/", listarUsuarios)




export default router;