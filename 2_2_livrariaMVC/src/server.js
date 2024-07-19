import "dotenv/config"
import express from "express"

//conexão com banco de dados
import conn from "./config/conn.js";

//Importação dos modulos e criação das tabelas
import "./models/livroModel.js"
const PORT = process.env.PORT

const app = express();

app.get("/", (request, response) => {
response.send('ola mundo')
})


app.listen(PORT,()=>{
    console.log("servidor on PORT:",PORT)
})