import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid"
import { request, response } from "express";


export const getMotoristas = (request, response)=>{
    const sql = `SELECT * FROM motorista`
    conn.query(sql, (err, data)=>{
       if(err){
           response.status(500).json({message: "Erro ao buscar motorista"})
           return;
       }

       const motoristas = data
       response.status(200).json(motoristas)
    })
};

export const cadastrarMotorista = (request, response)=>{
    const {nome, data_nascimento, numero_carteira_habilitacao} = request.body;  
    // validades
    if(!nome){
      response.status(400).json({message:"O nome da Linha é obrigatorio"})
      return
    }
    if(!data_nascimento){
     response.status(400).json({message:"A data de nascimento é obrigatoria"})
     return
    }
    
    if(!numero_carteira_habilitacao){
     response.status(400).json({message:"O numero da carteira de habilitação é obrigatório"})
     return
    }
    
    
    // cadastrar um livro -> antes preciso saber se esse livro existe 
    const checkSql = /*sql*/  `SELECT * FROM motorista WHERE nome = "${nome}" AND
    data_nascimento = "${data_nascimento}" AND 
    numero_carteira_habilitacao = "${numero_carteira_habilitacao}"`
 
    //  const checkSqlData = ["nome", nome , "numero_linha", numero_linha, "intinerario", intinerario]
conn.query(checkSql, (err, data)=>{
    if(err){
     response.status(500).json({message:"Erro ao buscar motoristas"})
     return console.log(err); 
    }
     
    if(data.length > 0){
     response.status(409).json({message: "o motorista ja existe"}); 
     return console.log(err); 
    }
    
    const id = uuidv4()
    
    
    // inserir dados
    const insertSql = /*sql*/ `INSERT INTO motorista
    (id_motorista, nome, data_nascimento, numero_carteira_habilitacao)
    VALUES ("${id}","${nome}","${data_nascimento}","${numero_carteira_habilitacao}")` 

    
    conn.query(insertSql, (err)=>{
        if(err){
             response.status(500).json({message:"Erro ao cadastrar motorista"}); 
        }
            response.status(201).json({message:"motorista cadastrado com sucesso"})
        })
    }); 
};

export const buscarMotorista = (request, response) =>{
    const {id} = request.params

    const sql = `SELECT * FROM motorista WHERE ?? = ?`

    const dataSql = ["id_motorista", id ]

    conn.query(sql, dataSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: "Erro ao buscar motorista"})
            return;
        }

        if(data.length === 0 ){
            response.status(404).json({message:"motorista não encontrado"})
        }

        const motorista = data[0]
        response.status(200).json(motorista)
    })
}

