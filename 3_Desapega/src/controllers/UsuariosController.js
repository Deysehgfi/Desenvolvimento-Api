import { request, response } from "express";
import conn from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"


// export const listarUsuarios = (request, response) => {

// }

export const registrarUsuario = (request, response) => {
    const { nome, email, telefone, senha, confirmsenha } = request.body

    const checkEmailSQL = `SELECT * FROM usuarios WHERE ?? = ?`

    const checkEmailSQLData = ["email", email]

    conn.query(checkEmailSQL, checkEmailSQLData, async (err, data) => {
        if (err) {
            console.log(err)
            response.status(500).json({ err: "Não foi possivel buscar usuario" })
            return;
        }
        //validação se o email ja estiver em uso
        if (data.length > 0) {
            response.status(409).json({ err: "E-mail ja está em uso!" })
        }

        //Criar a senha do usuario
        const salt = await bcrypt.genSalt(12) //genSalt(12) caracther extra


        const senhaHash = await bcrypt.hash(senha, salt)
        //hash() -> vai receber a senha do usuario e juntar com o salt

        // console.log(salt)
        // console.log("senha recebida:"+senha)
        // console.log("senha criptografada:"+senhaHash)

    })


    //cadatrar uuario 

    const id = uuidv4();
    const image = "userDefault.png"

    const insertSql = `INSERT INTO usuarios(?? ,??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)`
    const DataInsrtSQL = ["id_usuario", "nome", "email", "telefone", "senha", "image", id, nome, email, telefone, senha, image]


    conn.query(insertSql, DataInsrtSQL, (err) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao cadastrar usuario" })
            return;
        }

        response.status(201).json({ message: "Usuario registrado com sucesso ✨" })
    })
};

