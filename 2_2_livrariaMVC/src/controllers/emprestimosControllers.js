import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid"
import {request, response } from 'express'

export const getEmprestimos = (request, response) => {
const sql = `SELECT * FROM emprestimos`

conn.query(sql, (err, data)=>{
    if(err){
        response.status(500).json({message:"Erro ao buscar emprestimos"})
        return;
    }

    const emprestimos = data
    response.status(200).json(emprestimos)
})


}

export const criarEmprestimo = (request, response) =>{
    const {id} = request.params

   const {id_cliente, id_livro, data_emprestimo, data_devolucao} = request.body


if(!id_cliente){
    response.status(400).json({message:"o id do cliente é obrigatório"})
    return;
}
if(!id_livro){
    response.status(400).json({message: "o id do livro é obrigatório"})
}
if(!data_emprestimo){
    response.status(400).json({message:"a data do emprestimo é obrigatória"})
}
if(!data_devolucao){
    response.status(400).json({message: "a data de devolução é obrigatória"})
}

const checkSql = `SELECT * FROM emprestimos WHERE id_cliente = ${id_cliente} AND id_livro = ${id_livro} AND data_emprestimo = ${data_emprestimo}`

conn.query(checkSql, (err)=>{
    if(err){
        response.status(500).json({message:"Erro ao buscar Emprestimos"})
        console.error(err)
        return;
    }

    if(data.length > 0){
        response.status(409).json({message: "Empretimo já existe na livraria"}); 
        return console.log(err); 
    }

    const insertSql = `INSERT INTO emprestimos(id_cliente, id_livro, data_emprestimo, data_devolucao, id) VALUES("${id_cliente}", "${id_livro}","${data_emprestimo}","${data_devolucao}", "${id}")`

    conn.query(insertSql, (err)=>{
        if(err){
         response.status(500).json({message:"Erro ao Criar emprestimo"}); 
     }
     response.status(201).json({message:"Emprestimo foi criado"})
    
})
})
};