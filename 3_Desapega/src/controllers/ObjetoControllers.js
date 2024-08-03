import getToken from "../helpers/get-token"
import getUserByIdToken from "../helpers/get-user-by-token"
import { v4 as uuidv4 } from "uuid"
import conn from "../config/conn"
import { response } from "express"



export const create = async (request, response) => {
    const { nome, peso, cor, descricao } = request.body

    const disponivel = 1


    //buscar o token do usuario cadastrado
    const token = getToken(request)
    const user = getUserByIdToken(token)

    if (!nome) {
        response.status(400).json("O nme do objeto é obrigatório")
        return
    }

    if (!peso) {
        response.status(400).json("O peso do objeto é obrigatório")
        return
    }
    if (!cor) {
        response.status(400).json("A cor do objeto é obrigatório")
        return
    }

    if (!descricao) {
        response.status(400).json("A descricao do objeto é obrigatório")
        return
    }

    const objeto_id = uuidv4()
    const usuario_id = user.id_usuario
    const insertSql = `INSERT INTO objetos(??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)`

    const insertSqlData = [
        "objeto_id",
        "nome",
        "peso",
        "cor",
        "descricao",
        "disponivel",
        "usuario_id",
        nome,
        peso,
        cor,
        descricao,
        disponivel,
        usuario_id
    ]

    conn.query(insertSql, insertSqlData, (err, data) => {
        if (err) {
            console.error(err)
            response.status(500).json({ err: "Erro ao cadastrar" })
            return;
        }
        if (request.files) {
            const insertImgeSql = `INSERT INTO objeto_imagens(image_id, objeti_id, image_path) VALUES ?`

            const imageValues = request.files.map((file) => [
                uuidv4(),
                objeto_id,
                file.filename,

            ])

            conn.query(insertImgeSql, [imageValues], (err, data) => {
                if (err) {
                    console.error(err)
                    response.status(500).json({ err: "Erro ao salvar imgs do obj" })
                    return;
                }
                response.status(201).json({ message: "Obj cadastrado com sucesso" })
            })

        } else {
            response.status(201).json({ message: "Obj cadastrado com sucesso" })
        }
    })

}

export const getAllObjectUSer = async (request, response) => {
    try {
        const token = getToken(request)
        const user = await getUserByIdToken(token)
        const usuarioId = user.id_usuario
        const selectSql = `
        SELECT 
        obj.objeto_id, obj.usuario_id, obj.nome, obj.peso, obj.cor, obj.descricao,
        
        GROUP_CONCAT
        (obj_img.image_path SEPARATOR',') AS image_path 
        
        FROM 
        objetos AS obj 
        
        LEFT JOIN 
        objeto_images AS obj_img ON obj.objeto_id = obj_img.objeto_id
        
        WHERE
        obj.usuario_id = ?
         
        GROUP BY 
         obj.objeto, obj.usuario_id, obj.nome, obj.peso, obj.cor, obj.descricao
         `
        conn.query(selectSql, [], (err, data) => {
            if (err) {
                console.error(err)
                response.status(500).json({ err: "Erro ao cadastrar" })
                return;
            }

            const obejtoUsuro = data.map()
            response.status(200).json(obejtoUsuro)
        })
    } catch (err) {
        console.error(err)
    }
}