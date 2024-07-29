import { Router, request, response } from "express";


const router = Router()

//import helpers 
import validarUsuario from "../helpers/validar-user.js";

//localhost:4444/usuarios/registro

import { registrarUsuario } from "../controllers/UsuariosController.js";

//login tipo post -> pois vai esta recebendo informação do body
//a validação vai ser executada primeiro antes de executar o controlador. e se estiver tudo validado executa o controlador
router.post("/register", validarUsuario, registrarUsuario)

router.get("/", (request, response) => {
    response.send("rota de listar usuarios")
})


export default router;