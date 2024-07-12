import "dotenv/config" 
import express, { request, response } from "express"
import mysql from "mysql2"
import { v4 as uuidv4} from "uuid"


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
    const sql = 'SELECT * FROM livros'; //intrução para selecionar todos os livro

    //faço um requisição e espera uma resposta que retorna em callback ()=>{}
    connection.query(sql, (err,data)=>{

        if(err){
            response.status(500).json({message: 'Erro ao buscar livros'})
            return console.log(err)
        }

        const livros = data
        console.log('Dados:'+data) //data retornaria o array onde armazena os dados
        console.log('Tipo do dado: '+ typeof data) //retorna como objeto 
        response.status(200).json(livros)
    })
 

})

app.post("/livros", (request, response)=>{
    // response.send("ola mundo")
    const {titulo, autor, genero, ano_publicacao, preco} = request.body

    //validações dos campos obrigatórios
    if(!titulo){
        response.status(400).json({message: 'O titulo é obrigatório'})
    }
    if(!autor){
        response.status(400).json({message: 'O autor é obrigatório'})
    }
    if(!genero){
        response.status(400).json({message: 'O genero é obrigatório'})
    } 
    if(!ano_publicacao){
        response.status(400).json({message: 'O ano de publicação é obrigatório'})
    } 
    if(!preco){
        response.status(400).json({message: 'O preco é obrigatório'})
    } 
    // if(!disponibilidade){
    //     response.status(400).json({message: 'O disponibilidade é obrigatório'})
    // }


    //cadastro-----------------------------------------------------
    //sem dados repetidos 
    // validação se os livros forem existente
    //validacao sera
    // const checkSql = ""
    const checkSql = `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`
    
    connection.query(checkSql,(err,data)=>{
        if(err){
            response.status(500).json({message:"Erro ao buscar os livros"})
            return console.log(err);
        }
    
        if(data.length > 0 ){
            response.status(409).json({message: "Livro ja existe na livraria"})
            return console.log(err);
        }
    })
 })




//Rota 404
app.use((request,response)=>{
    response.status(404).json({message:"Rota não encontrada"})
})


app.listen(PORT, ()=>{
    console.log(`servidor on PORT:${PORT}`)
})
