import { Router, request, response } from "express";


const router = Router()

//import helpers 
import validarUsuario from "../helpers/validar-user.js";
import verifyToken from "../helpers/verify-Token.js"

//localhost:4444/usuarios/registro

import { registrarUsuario, listarUsuarios, login, checkUser, getUserById, editUser} from "../controllers/UsuariosController.js";

//login tipo post -> pois vai esta recebendo informação do body
//a validação vai ser executada primeiro antes de executar o controlador. e se estiver tudo validado executa o controlador
router.post("/register", validarUsuario, registrarUsuario)
router.post("/login", login)
router.get("/checkUser/:id", checkUser)
router.get("/:id", getUserById)
router.get("/", listarUsuarios)

//Atulizar ou editar usuario 
router.put("/edit/:id", editUser, verifyToken)
//verificar se o usuario esta logado para consegir editar 
//upload de imagem para o perfil






export default router;