import conn from "../config/conn";
import {v4 as uuidv4} from "uuid"


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
// export const cadastrarCliente = (request, response)=>{
//     // response.status(404).json({message:"Rota não encontrada"})
//     const {nome, email, image, password} = request.body;  
//     // validades
//     if(!nome){
//       response.status(400).json({message:"O nome de Usuario é obrigatorio"})
//       return
//     }
//     if(!email){
//      response.status(400).json({message:"O email é obrigatorio"})
//      return
//     }
//     if(!image){
//      response.status(400).json({message:"a imagem é obrigatória"})
//      return
//     }
//     if(!password){
//      response.status(400).json({message:"A senha é obrigatória"})
//      return
//     }
   
    
//     // cadastrar um livro -> antes preciso saber se esse livro existe 
//     const checkSql = /*sql*/  `SELECT * FROM clientes WHERE nome ="${nome}" AND
//     email = "${email}" AND 
//     password = "${password}"`
//     conn.query(checkSql, (err, data)=>{
//     if(err){
//      response.status(500).json({message:"Erro ao buscar clientes"})
//      return console.log(err); 
//     }
     
//     if(data.length > 0){
//      response.status(409).json({message: "o cliente ja existe"}); 
//      return console.log(err); 
//     }
    
//     const id = uuidv4()
    
    
//     // inserir dados
//     const insertSql = /*sql*/ `INSERT INTO clientes
//     (id, nome, email, image, password)
//     VALUES ("${id}","${nome}","${email}","${image}","${password}")` 
//     conn.query(insertSql, (err)=>{
//         if(err){
//              response.status(500).json({message:"Erro ao cadastrar cliente"}); 
//         }
//             response.status(201).json({message:"Cliente cadastrado com sucesso"})
//         })
//     }); 
// };