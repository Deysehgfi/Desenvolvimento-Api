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
     response.send("ola mundo")
})

//Rota 404
app.use((request,response)=>{
    response.status(404).json({message:'Rota não encontrada'})
})


app.listen(PORT, ()=>{
    console.log(`servidor on PORT:${PORT}`)
})