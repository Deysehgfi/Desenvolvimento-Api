import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid"
import { request } from "express";


export const getCliente = (request, response)=>{
    const sql = `SELECT * FROM clientes`
    conn.query(sql, (err, data)=>{
       if(err){
           response.status(500).json({message: "Erro ao buscar clientes"})
           return;
       }

       const clientes = data
       response.status(200).json(clientes)
    })
};

export const cadastrarCliente = (request, response)=>{
    // response.status(404).json({message:"Rota não encontrada"})
    const {nome, email, image, password} = request.body;  
    // validades
    if(!nome){
      response.status(400).json({message:"O nome de Usuario é obrigatorio"})
      return
    }
    if(!email){
     response.status(400).json({message:"O email é obrigatorio"})
     return
    }
    if(!email.includes("@")){
     response.status(422).json({message: "O e-mail deve conter @"})
    return;
    }
    if(!image){
     response.status(400).json({message:"a imagem é obrigatória"})
     return
    }
    if(!password){
     response.status(400).json({message:"A senha é obrigatória"})
     return
    }
   
    
    // cadastrar um livro -> antes preciso saber se esse livro existe 
    const checkSql = /*sql*/  `SELECT * FROM clientes WHERE ?? = ? AND
   ?? = ? AND 
    ?? = ?`

    const checkSqlData = ["nome", nome , "email", email, "password", password]


    conn.query(checkSql, checkSqlData, (err, data)=>{
    if(err){
     response.status(500).json({message:"Erro ao buscar clientes"})
     return console.log(err); 
    }
     
    if(data.length > 0){
     response.status(409).json({message: "o cliente ja existe"}); 
     return console.log(err); 
    }
    
    const id = uuidv4()
    
    
    // inserir dados
    const insertSql = /*sql*/ `INSERT INTO clientes
    (??, ??, ??, ??, ??)
    VALUES (?,?,?,?,?)` 
    const insertData = ["cliente_id", "nome", "email", "image", "password", id, nome, email, image, password]
    
    conn.query(insertSql, insertData, (err)=>{
        if(err){
             response.status(500).json({message:"Erro ao cadastrar cliente"}); 
        }
            response.status(201).json({message:"Cliente cadastrado com sucesso"})
        })
    }); 
};

export const buscarLivro = (request, response) =>{
    const {id} = request.params

    const sql = `SELECT * FROM clientes WHERE ?? = ?`

    const dataSql = ["clientes_id", id ]

    conn.query(sql, dataSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Eroo ao buscar cliente"})
            return;
        }

        if(data.length === 0 ){
            response.status(404).json({message:"Cliente não encontrado"})
        }

        const cliente = data[0]
        response.status(200).json(cliente)
    })
}