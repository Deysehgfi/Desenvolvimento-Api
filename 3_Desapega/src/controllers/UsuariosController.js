import { request, response } from "express";
import conn from "../config/conn.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken";

//helpers import 
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import getUserByIdToken from "../helpers/get-user-by-token.js";





export const listarUsuarios = (request, response) => {
    const sql = `SELECT * FROM usuarios`
    conn.query(sql, (err, data) => {
        if (err) {
            response.status(500).json({ message: "Erro ao buscar usuarios" })
            return;
        }

        const usuarios = data
        response.status(200).json(usuarios)
    })

};


export const login = (request, response) => {

    const { email, senha } = request.body

    if (!email) {
        response.status(400).json({ err: "o email é obrigatorio" })
        return;
    }

    if (!senha) {
        response.status(400).json({ err: "A senha é obrigatória " })
        return;
    }

    const checkSql = `SELECT * FROM usuarios WHERE ?? = ?`;
    const checkData = ["email", email]

    conn.query(checkSql, checkData, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao buscar usuario" })
            return;
        }

        if (data.length === 0) {
            response.status(404).json({ err: "Usuario não encontrado" })
        }

        //verificar se a senha existe/ comparar senha 
        const usuario = data[0]
        const compararSenha = bcrypt.compare(usuario.senha, senha)
        console.log("senha:", senha)
        console.log("senha do usuario:", usuario.senha)
        console.log("comparar senha:", compararSenha)

        if (!compararSenha) {
            return response.status(401).json({ err: "Senha Invalida" })
        }
        try {
            createUserToken(usuario, request, response)
        } catch (err) {
            console.log(error)
            response.status(500).json({ err: "Erro ao processar informação" })
        }
    })
}

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
            return;
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

        const usuarioSql = `SELECT * FROM usuarios WHERE ?? = ?`
        const usuarioData = ["id_usuario", id]
        conn.query(usuarioSql, usuarioData, async (err, data) => {
            if (err) {
                console.error(err);
                response.status(500).json({ err: "Erro ao selecionar usuário" })
                return;
            }
            const usuario = data[0]

            try {
                await createUserToken(usuario, request, response)
            } catch (error) {
                console.error(err)
            }

            console.log(usuario)
        })

        //Usuario esteja logado na aplicação
        //createUserToken()
        // response.status(201).json({ message: "Usuario registrado com sucesso ✨" })
    })
};


export const checkUser = (request, response) => {
    let usuarioAtual
    if (request.headers.authorization) {
        const token = getToken(request)
        // console.log(token)

        const decoded = jwt.decode(token, "SENHASUPERSEGURAEDIFICIL")
        console.log(decoded)

        const usuarioId = decoded.id

        const checkSql = `SELECT * FROM usuarios WHERE ?? = ?`
        const checkData = ["id_usuarios", usuarioId]

        conn.query(checkSql, checkData, (err, data) => {
            if (err) {
                console.error(err)
                response.status(500).json({ err: "Erro ao verificar usuario" })
                return;
            }
            usuarioAtual = data[0]
            response.status(200).json(usuarioAtual)
        })
    } else {
        usuarioAtual = null
        response.status(200).json(usuarioAtual)
    }
}


export const getUserById = (request, response) => {
    const { id } = request.params

    const checkSql = `SELECT id_usuario, nome, email, telefone, image FROM usuarios WHERE ?? = ?`

    const DataCheckSQL = ["id_usuario", id]

    conn.query(checkSql, DataCheckSQL, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao buscar usuario" })
            return;
        }

        if (data.length === 0) {
            response.status(404).json({ err: "Usuario não existe" })
            return;
        }

        const usuario = data[0]
        response.status(200).json(usuario)
        console.log(usuario)


    })
}


export const editUser = async (request, response) => {
    const { id } = request.params

    //verificar se o usuario esta logado 
    try {
        const token = getToken(request)
        //buscar dados no banco, nova consulta ao banco
        const user = await getUserByIdToken(token)
        console.log(user)

        //adicionar imagem ao obejto

        let image = user.image
        if(request.file){
            imagem = request.file.filename
        }
        
        if(!nome){
            return response.status(400).json({message: "O nome é obrigatório"})
        }
        if(!email){
            return response.status(400).json({message: "O email é obrigatório"})
        }
        if(!telefone){
            return response.status(400).json({message: "O telefone é obrigatório"})
        }

        const checkSql = `SELECT * FROM usuarios WHERE ?? = ?`
        const checkSqlData = ["id_usuario", id]

        conn.query(checkSql, checkSqlData, (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({err:" Erro ao buscar dados"})
                return;
            }

            if(data.length === 0 ){
                response.status(404).json({err:"Usuario não encontrado"})
                return;
            } 


            const checkEmailSQL = `SELECT * FROM usuarios WHERE ?? = ? AND ?? != ?`
            const checkEmailSQLData = ["email", email, "id_usuario",id]
            conn.query(checkEmailSQL, checkEmailSQLData, (err,data)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({err:"Erro ao buscar email"})
                    return;
                }

                if(data.length > 0){
                    response.json(409).json({err: "E-mail já está em uso"})
                    return;
                }

                const updateSql = `UPDATE usuarios SET ? WHERE ?? = ?`
                const updateSqlData = [{nome, email, telefone},"id_usuario", id]

                conn.query(updateSql, updateSqlData, (err, data)=>{
                    if(err){
                        console.error(err)
                        response.status(500).json({err: "Erro ao atualizar usuário"})
                    }

                    response.status(200).json({message: "Usuário Atualizado"})
                })
            })
        })
    } catch (err) {
        response.status(500).json({ err: error })
    }
}