import { response } from "express";
import jwt from "jsonwebtoken"
import conn from "../config/conn.js";

const getUserByIdToken = async (token) => {
     return new Promise((resolve, reject) =>{
        if(!token){
            response.status(401).json({err: "Acesso Bloqueado!"})
            return;
        }

        const decoded = jwt.verify(token,"SENHASUPERSEGURAEDIFICIL")
        // console.log("Função GetUser:",decoded)

        const userId = decoded.id
        // console.log("userId :", userId)

        const checkSql = `SELECT * FROM usuarios WHERE ?? = ?`

        const DataCheckSQL = ["id_usuario", userId]

        conn.query(checkSql, DataCheckSQL, (err, data)=>{
            if(err){
                reject()
            }
            else{
                resolve(data[0])
            }
        })
     })
}

export default getUserByIdToken;