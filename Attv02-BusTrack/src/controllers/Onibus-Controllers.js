import conn from "../config/conn.js";
import {v4 as uuidv4} from "uuid"
import { request, response } from "express";



export const getOnibus = (request, response)=>{
    const sql = `SELECT * FROM onibus`
    conn.query(sql, (err, data)=>{
       if(err){
           response.status(500).json({message: "Erro ao buscar Ônibus"})
           return;
       }

       const onibus = data
       response.status(200).json(onibus)
    })
};

export const cadastrarOnibus = (request, response)=>{
    const {placa, modelo, ano_fabricacao, capacidade,id_linha, id_motorista} = request.body;  
    // validades
    if(!placa){
      response.status(400).json({message:"A placa do Ônibus é obrigatoria"})
      return
    }
    if(!modelo){
     response.status(400).json({message:"O modelo do Ônibus é obrigatorio"})
     return
    }
    
    if(!ano_fabricacao){
     response.status(400).json({message:"O ano de fabricação do Ônibus é obrigatório"})
     return
    }

    if(!capacidade){
    response.status(400).json({message:"A capacidade do Ônibus é obrigatório"})
    return
          
    }
    if(!id_linha){
        response.status(400).json({message:"O id da linha é obrigatório"})
        return
              
    }
    if(!id_motorista){
    response.status(400).json({message:"O id do motorista é obrigatório"})
    return
                  
    }
    // cadastrar um livro -> antes preciso saber se esse livro existe 
    const checkSql = /*sql*/  `SELECT * FROM linhas WHERE placa = "${placa}" AND id_linha = "${id_linha}" AND 
    id_motorista = "${id_motorista}"`
 
    //  const checkSqlData = ["nome", nome , "numero_linha", numero_linha, "intinerario", intinerario]
conn.query(checkSql, (err, data)=>{
    if(err){
     response.status(500).json({message:"Erro ao buscar ônibus"})
     return console.log(err); 
    }
     
    if(data.length > 0){
     response.status(409).json({message: "O ônibus ja existe"}); 
     return console.log(err); 
    }
    
    const id = uuidv4()
    
    
    // inserir dados
    const insertSql = /*sql*/ `INSERT INTO linhas
    (id, placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista)
    VALUES ("${id}","${placa}","${modelo}","${ano_fabricacao}","${capacidade}","${id_linha}","${id_modelo}")` 

    
    conn.query(insertSql, (err)=>{
        if(err){
             response.status(500).json({message:"Erro ao cadastrar ônibus"}); 
        }
            response.status(201).json({message:"Ônibus cadastrado com sucesso ✨"})
        })
    }); 
};

// export const buscarLinha = (request, response) =>{
//     const {id} = request.params

//     const sql = `SELECT * FROM linhas WHERE ?? = ?`

//     const dataSql = ["id_Linha", id ]

//     conn.query(sql, dataSql, (err, data)=>{
//         if(err){
//             console.error(err)
//             response.status(500).json({message: "Erro ao buscar linha"})
//             return;
//         }

//         if(data.length === 0 ){
//             response.status(404).json({message:"Linha não encontrado"})
//         }

//         const linha = data[0]
//         response.status(200).json(linha)
//     })
// }

