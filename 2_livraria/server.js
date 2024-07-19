import "dotenv/config" 
import express, { request, response } from "express"
import mysql from "mysql2"
import { v4 as uuidv4} from "uuid"

//Inline SQL Highlight -> extenção do vscode
//o numero da porta esta no arquivo env
//o arquivo env é caso a port esteja com valor ocupado no computador
const PORT = process.env.PORT;

const app = express()

app.use(express.json())

// criar Comunicação com my sql (banco de dados)
//cria uma variavel connection e atribui ele com a propriedade sql createConnection para conectar e atribui um objet a ele
const connection = mysql.createConnection({
host: 'localhost', //rota
user: 'root', //usuario do workbrench
password: 'Sen@iDev77!.',// senha do usuario do workbrench
database: 'livraria', //nome do banco de dados
port: 3306 //numero da port do usuario do workbrench
})



//Conectar ao banco de dados
connection.connect((err)=>{
    if(err){
        console.error(err.stack)
    }

    console.log("MySql Conectado")
})




app.get("/livros", (request, response)=>{
   // response.send("ola mundo")
    const sql = `SELECT * FROM livros`; //intrução para selecionar todos os livro

    //faço um requisição e espera uma resposta que retorna em callback ()=>{}
    connection.query(sql, (err,data)=>{

        if(err){
            response.status(500).json({message: 'Erro ao buscar livros'})
            return console.log(err)
        }

        const livros = data
        // console.log('Dados:'+data) //data retornaria o array onde armazena os dados
        // console.log('Tipo do dado: '+ typeof data) //retorna como objeto 
        response.status(200).json(livros)
    })


})

app.post("/livros", (request, response)=>{
// response.status(404).json({message:"Rota não encontrada"})
const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body;  
// validades
if(!titulo){
  response.status(400).json({message:"O titulo é obrigatorio"})
  return
}
if(!autor){
 response.status(400).json({message:"O autot é obrigatorio"})
 return
}
if(!ano_publicacao){
 response.status(400).json({message:"O ano publicação é obrigatório"})
 return
}if(!genero){
 response.status(400).json({message:"O genero é obrigatório"})
 return
}
if(!preco){
 response.status(400).json({message:"O preço é obrigatório"})
 return
}

// cadastrar um livro -> antes preciso saber se esse livro existe 
const checkSql = /*sql*/  `SELECT * FROM livros WHERE titulo ="${titulo}" AND
autor = "${autor}" AND 
ano_publicacao = "${ano_publicacao}"`
connection.query(checkSql, (err, data)=>{
if(err){
 response.status(500).json({message:"Erro ao buscar livros"})
 return console.log(err); 
}
 
if(data.length > 0){
 response.status(409).json({message: "Livro já existe na livraria"}); 
 return console.log(err); 
}

const id = uuidv4()
const disponibilidade = 1

// inserir dados
const insertSql = /*sql*/ `INSERT INTO livros 
(id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
VALUES ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")` 
connection.query(insertSql, (err)=>{
 if(err){
     response.status(500).json({message:"Erro ao cadastrar livro"}); 
 }
 response.status(201).json({message:"Livro cadastrado"})
})
}); 



    // // response.send("ola mundo")
    // //recebendo as requisiçõe do body
    // const {titulo, autor, genero, ano_publicacao, preco} = request.body;

    // //validações dos campos obrigatórios
    // if(!titulo){
    //     response.status(400).json({message: 'O titulo é obrigatório'})
    //     return
    // }
    // if(!autor){
    //     response.status(400).json({message: 'O autor é obrigatório'})
    //     return
    // }
    // if(!genero){
    //     response.status(400).json({message: 'O genero é obrigatório'})
    //     return
    // } 
    // if(!ano_publicacao){
    //     response.status(400).json({message: 'O ano de publicação é obrigatório'})
    // } 
    // if(!preco){
    //     response.status(400).json({message: 'O preco é obrigatório'})
    // } 
    // // if(!disponibilidade){
    // //     response.status(400).json({message: 'O disponibilidade é obrigatório'})
    // // }


    // //cadastro-----------------------------------------------------
    // //sem dados repetidos 
    // // validação se os livros forem existente
    // //validacao sera
    // // const checkSql = ""
    // const checkSql = /*sql*/ `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}" `
    
    // connection.query(checkSql,(err, data)=>{
    //     if(err){
    //         response.status(500).json({message:"Erro ao buscar os livros"})
    //         return console.log(err);
    //     }
    
    //     //se os 
    //     if(data.length > 0 ){
    //         response.status(409).json({message: "Livro ja existe na livraria"})
    //         return console.log(err);
    //     }
    
    //     const id = uuidv4() //atribui um valor ao id
    //     const disponibilidade = 1 

    //     const inserSql = /*sql */ `INSERT INTO livros
    //     (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) VALUES ("${id}","${titulo},"${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")`

    //     console.log(genero)


    //     connection.query(inserSql,(err)=>{
    //         if(err){
    //             response.status(500).json({message:"Erro ao cadastrar livro"})
    //         }
    //         response.status(201).json({message:"livros foi cadastrado"})
    //     })
    // })
 });


 //listar somente um livro
 app.get('/livros/:id', (request, response)=>{
 const {id} = request.params //para extrair i id do paramentros

 const sql = /*sql */ `SELECT * FROM livros WHERE id = "${id}"`

 connection.query(sql, (err, data)=>{
    if(err){
        console.error(err)
        response.status(500).json({message: "Erro ao buscar livro"})
        return
    }


    //se o array data retorna 0 o livro n existe
    if(data.length === 0){
response.status(404).json({message: "Livro não encontrado"})
    }

    const livro = data[0] // para retornar em objeto
    response.status(200).json(livro)
 })
 })



 //atualizar livro
 app.put('/livros/:id', (request, response)=>{
        const {id} = request.params

        const { titulo, autor, ano_publicacao , genero, preco, disponibilidade} = request.body;

        //validações 
        if(!titulo){
            response.status(400).json({message: 'O titulo é obrigatório'})
            return
        }
        if(!autor){
            response.status(400).json({message: 'O autor é obrigatório'})
            return
        }
        if(!genero){
            response.status(400).json({message: 'O genero é obrigatório'})
            return
        } 
        if(!ano_publicacao){
            response.status(400).json({message: 'O ano de publicação é obrigatório'})
            return
        } 
        if(!preco){
            response.status(400).json({message: 'O preco é obrigatório'})
            return
        } 
        if(disponibilidade === undefined){
            response.status(400).json({message: 'A disponibilidade é obrigatória'})
            return
        } 



//checar se existe no sql
        const checkSql = /*sql */ `SELECT * FROM livros WHERE id = "${id}"` 
        connection.query(checkSql, (err, data)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: ""})
            }

            if(data.length === 0 ){
               return response.status(404).json({message:"Livro não encontrado"})
            }

            const updateSql = /*sql */ `UPDATE livros SET titulo = "${titulo}" , autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}" WHERE  id = "${id}"`


            connection.query(updateSql,(err)=>{
                if(err){
                    console.error(err)
                    response.status(500).json({message: "Erro ao atualizar livros"})
                    return
                }

                response.status(200).json({message: "livro atualizado"})
            })
        })
 })

 //deletar  livro
 app.delete('/livros/:id', (request, response)=>{
        const {id} = request.params;
    
        const deleteSql = `DELETE * FROM WHERE id = "${id}"`

        connection.query(deleteSql, (err, info)=>{
            if(err){
                response.status(500).json({message:  "Erro ao deletar o livro"})
                return
            }

            if(info.affectedRows === 0 ){
                response.status(404).json({message: "Livro não encontrado"})
                return
            }
            console.log(info)

            response.status(200).json({message: "o Livro selecionado foi deletado"})
        })
 })



//Rota 404
app.use((request,response)=>{
    response.status(404).json({message:"Rota não encontrada"})
})


app.listen(PORT, ()=>{
    console.log(`servidor on PORT:${PORT}`)
})


