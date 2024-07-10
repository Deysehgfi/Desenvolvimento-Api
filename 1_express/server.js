// const express = require('express')
import express from 'express'

const PORT = 3333;
//cria um servidor 
const app = express()

//rota com method === get 
//rota , função de callbak com requisição e a resposta
app.get("/", (request, response)=>{
// response.status(200).json({msg: "GET"})
//cabeçalho 200 retorna como objeto json com uma menssage

response.status(200).json([
    "Pessoas 1",
    "Pessoas 2",
    "Pessoas 3"
]) 
})

//post
app.post("/users", (request,response)=>{
    // response.status(200).json({msg:"POST"})
    response.status(201).json([
        "Pessoas 1",
        "Pessoas 2",
        "Pessoas 3",
        "Pessoas 4"
    ]) 
}) 


//put
app.put("/users", (request,response)=>{
    // response.status(200).json({msg:"PUT"})
    response.status(201).json([
        "Pessoas 1",
        "Pessoas 10",
        "Pessoas 3",
        "Pessoas 4"
    ]) 
})


app.patch("/users", (request,response)=>{
    response.status(200).json({msg:"PATCH"})
})

app.delete("/users", (request,response)=>{
    // response.status(200).json({msg:"DELETE"})
    response.status(204).json([
        "Pessoas 1",
        "Pessoas 3",
        "Pessoas 4"
    ]) 
})


//listar o o servidos
app.listen(PORT, ()=>{
    console.log("Servidor on PORT:" +PORT)
})

/*Terminal
-Divide o terminal em 2

*/