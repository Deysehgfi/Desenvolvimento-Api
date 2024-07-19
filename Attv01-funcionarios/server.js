import express from "express"
import mysql from "mysql2"
import {v4 as uuidv4 } from "uuid"

//criar a porta
const PORT = 3333;

//npm i express
//npm i mysql2
//npm i uuid

//criar comunicação com my sql 
 const connection = mysql.createConnection({
    host: 'localhost', //rota
    user: 'root', //usuario do workbrench
    password: 'Sen@iDev77!.',// senha do usuario do workbrench
    database: 'funcionarios', //nome do banco de dados
    port: 3306 //numero da port do usuario do workbrench
 })

 //conectar ao banco de dados
 connection.connect((err)=>{
    if(err){
        console.log("MySql Conectado")
    }
 })

//criar o servidor
const app = express()

app.use(express.json())


 //ROTAS -----------------------------------------------------------

 //listar todos os funcionsrios 
 app.get("/funcionarios", (request, response)=>{
    const sql = `SELECT * FROM funcionarios`;

    connection.query(sql, (err, data)=>{
        if(err){
            response.status(500).json({message: "Erro ao selecionar funcionario"})
            return console.error(err)
        }

        const funcionarios = data
        response.status(200).json(funcionarios)

        console.log("dados armazenados:", data)
    
        if(funcionarios.length === 0){
            response.status(404).json({message: "não existe funcionarios cadastrados"})
        }
    })
 })

 //cadastrar funcionario
 app.post("/funcionarios",(request,response)=>{
    //receber essas informções do corpo do body
    const {nome, email, cargo, data_contratacao, salario } = request.body
    //validação dados obrigatórios
if(!nome){
  response.status(400).json({message:"O nome é obrigatorio"})
  return
}
   
if(!cargo){
    response.status(400).json({message:"O cargo é obrigatório"})
    return
   }
   if(!data_contratacao){
    response.status(400).json({message:"A data de contratação é obrigatória"})
    return
   }
   if(!salario){
    response.status(400).json({message:"O salário é obrigatório"})
    return
   }

if(!email){
 response.status(400).json({message:"O email é obrigatorio"})
 return
}
//validação do formato do email -------------------------------------------------------------------------------------------
// se o email não estiver incluso o caracter "@"  não irá funcionar
if(!email.includes("@")){
    response.status(422).json({message:"Email deve conter @"})
    return
   }

   const checkEmailSql = /*sql */ `SELECT * FROM funcionarios WHERE email = "${email}"`
   connection.query(checkEmailSql, (err, data) =>{

if(err){
    response.status(500).json({message: "Erro ao listar funcionarios"})
    return console.error(err)
} 

if(data.length > 0){
    response.status(409).json({message: "O email ja esta em uso"})
    return console.error(err)
}



   })

const id = uuidv4()
    
    const insertSql = /*sql*/ `INSERT INTO funcionarios 
(id, nome , email, data_contratacao, salario, cargo)
VALUES ("${id}","${nome}","${email}","${data_contratacao}","${salario}","${cargo}")` 


connection.query(insertSql, (err)=>{
 if(err){
     response.status(500).json({message:"Erro ao cadastrar funcionario"}); 
 }
 response.status(201).json({message:"funcionario cadastrado"})
})
    


 })

 //listar um funcionario
 app.get('/funcionarios/:id', (request, response)=>{
    const {id} = request.params //para extrair i id do paramentros
   
    const sql = /*sql */ `SELECT * FROM funcionarios WHERE id = "${id}"`
    // selecionar tudo da tabela funcionarios com id = id do parametro da url 
   
    connection.query(sql, (err, data)=>{
       if(err){
           console.error(err)
           response.status(500).json({message: "Erro ao buscar dados"})
           return
       }
   
   
       //se o array data retorna 0 o fuuncionario n existe
       if(data.length === 0){
   response.status(404).json({message: "funcionario não encontrado"})
       }
   
       const funcionario = data[0] // para retornar em objeto
       response.status(200).json(funcionario)
    })
    })

     //atualizar um funcionario
    app.put("/funcionarios/:id", (request, response)=>{

    const {id} = request.params

        
    const {nome, email, cargo, data_contratacao, salario } = request.body

        //validações 
        if(!nome){
            response.status(400).json({message:"O nome é obrigatorio"})
            return
          }
          if(!email){
           response.status(400).json({message:"O email é obrigatorio"})
           return
          }
          if(!cargo){
           response.status(400).json({message:"O cargo é obrigatório"})
           return
          }if(!data_contratacao){
           response.status(400).json({message:"A data de contratação é obrigatória"})
           return
          }
          if(!salario){
           response.status(400).json({message:"O salário é obrigatório"})
           return
          }
          


//checar se o id existe no sql
        const checkSql = /*sql */ `SELECT * FROM funcionarios WHERE id = "${id}"`
        

        //consulta
        connection.query(checkSql, (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao buscar dados"})
            }

            //verificar se o funcionario existe 
            if(data.length === 0 ){
               return response.status(404).json({message:"funcionario não encontrado"})
            }

            //verificação se o email esta em uso
            const emailCheckSql = `SELECT * FROM funcionarios WHERE email = "${email}" AND id != "${id}"`
            //seleciona tudo da tabela funcionarios se o email for igual ao email apresentado e o id for diferente 

            connection.query(emailCheckSql, (err, data)=>{
                if(err){
                    response.status(500).json({message: "Erro ao verificar os email"})
                    return
                }

                //verificar se dentro do array data for maior que 0 com a condição do email igual 
                if(data.length > 0){
                    return response.status(409).json({message: "email ja esta em uso"})

                }
            })


            //atualizar
            const updateSql = /*sql */ `UPDATE funcionarios SET nome = "${nome}" , email = "${email}", cargo = "${cargo}", salario = "${salario}", data_contratacao = "${data_contratacao}" WHERE  id = "${id}"`

           

            connection.query(updateSql,(err)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({message: "Erro ao atualizar funcionario"})
                    return
                }

                response.status(200).json({message: "funcionario atualizado"})
            })
        })
    })
   
   //deletar um funcionario
    app.delete('/funcionarios/:id', (request, response)=>{
        const {id} = request.params;
    
        const deleteSql = `DELETE * FROM funcionarios WHERE id = "${id}"`

        connection.query(deleteSql, (err, info)=>{
            if(err){
                response.status(500).json({message:  "Erro ao deletar o funcionario"})
                return
            }

            if(info.affectedRows === 0 ){
                response.status(404).json({message: "funcionario não encontrado"})
                return
            }
            console.log("informações saidas do info:b",info)

            response.status(204).send({message: "funcionario selecionado foi deletado"})
        })
 })


//rota 404
    app.use((request,response)=>{
        response.status(404).json({message:"Rota não encontrada"})
    })




    //encherrar a conecção com MySql
    process.on('SIGINT', ()=>{
        connection.end((err)=>{
            if(err){
                console.error(`Erro ao fechar conexão ${err.message}`)
            }

            console.log("Conexão com MYSQL encerrada.")
            process.exit()
        })
    })

//listar
app.listen(PORT, ()=>{
    console.log(`servidor on PORT:${PORT}`)
})