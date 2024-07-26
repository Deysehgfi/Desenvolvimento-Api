import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid"
import { request, response } from "express";


export const getLinhaOnibus = (request, response)=>{
    const sql = `SELECT * FROM linhas`
    conn.query(sql, (err, data)=>{
       if(err){
           response.status(500).json({message: "Erro ao buscar linhas"})
           return;
       }

       const linhas = data
       response.status(200).json(linhas)
    })
};

export const criarLinha = (request, response)=>{
    const {nome, numero_linha, intinerario} = request.body;  
    // validades
    if(!nome){
      response.status(400).json({message:"O nome da Linha é obrigatorio"})
      return
    }
    if(!numero_linha){
     response.status(400).json({message:"O numero da linha é obrigatorio"})
     return
    }
    
    if(!intinerario){
     response.status(400).json({message:"O intinerário é obrigatório"})
     return
    }
    
    
    // cadastrar um livro -> antes preciso saber se esse livro existe 
    const checkSql = /*sql*/  `SELECT * FROM linhas WHERE nome = "${nome}" AND
    numero_linha = "${numero_linha}" AND 
     intinerario = "${intinerario}"`
 
    //  const checkSqlData = ["nome", nome , "numero_linha", numero_linha, "intinerario", intinerario]
conn.query(checkSql, (err, data)=>{
    if(err){
     response.status(500).json({message:"Erro ao buscar linhas"})
     return console.log(err); 
    }
     
    if(data.length > 0){
     response.status(409).json({message: "a linha ja existe"}); 
     return console.log(err); 
    }
    
    const id = uuidv4()
    
    
    // inserir dados
    const insertSql = /*sql*/ `INSERT INTO linhas
    (id_Linha, nome, numero_linha, intinerario)
    VALUES ("${id}","${nome}","${numero_linha}","${intinerario}")` 

    
    conn.query(insertSql, (err)=>{
        if(err){
             response.status(500).json({message:"Erro ao criar linha"}); 
        }
            response.status(201).json({message:"Linha iniciada com sucesso"})
        })
    }); 
};

export const buscarLinha = (request, response) =>{
    const {id} = request.params

    const sql = `SELECT * FROM linhas WHERE ?? = ?`

    const dataSql = ["id_Linha", id ]

    conn.query(sql, dataSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao buscar linha"})
            return;
        }

        if(data.length === 0 ){
            response.status(404).json({message:"Linha não encontrado"})
        }

        const linha = data[0]
        response.status(200).json(linha)
    })
}

export const editarLinha = (request , response) => {
    const {id} = request.params

    const {nome , numero_linha , intinerario } = request.body

    if(!nome){
        response.status(400).json({message: 'O nome da linha é obrigatório'})
        return
    }
    if(!numero_linha){
        response.status(400).json({message: 'O numero da linha é obrigatório'})
        return
    }
    if(!intinerario){
        response.status(400).json({message: 'O intinerário da linha é obrigatório'})
        return
    } 

//checar se existe no sql
    const checkSql = /*sql */ `SELECT * FROM linhas WHERE id_Linha = "${id}"` 
    conn.query(checkSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao buscar Linha"})
        }

        if(data.length === 0 ){
           return response.status(404).json({message:"Linha não encontrada"})
        }

        const updateSql = /*sql */ `UPDATE linhas SET nome = "${nome}" , numero_linha = "${numero_linha}", intinerario = "${intinerario}" WHERE id_Linha = "${id}"`


        conn.query(updateSql,(err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao atualizar linha"})
                return
            }

            response.status(200).json({message: "linha atualizado"})
        })
    })
    
}
