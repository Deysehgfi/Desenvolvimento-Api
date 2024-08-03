import "dotenv/config"
import express, { request } from "express"
import path from "node:path"
import { fileURLToPath } from "node:url";

//criar port
const PORT = process.env.PORT;

//import conexão com mysql
import conn from "./config/conn.js";

//import o express para criar o server
const app = express();


//importação dos modulos [TABELA]
import "./models/UsuarioModel.js"
import "./models/objetoModel.js"


//importação da rotas
import usuariosRoutes from "./routes/UsuariosRoutes.js"

//test
// app.get("/", (request, response) => {
//    response.send("ola")

// })


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.urlencoded({ extended: true }))
app.use(express.json())



//localizar onde está a pasta public
app.use("/public", express.static(path.join(__dirname,"public")))



//utilizar rotas
app.use("/usuarios", usuariosRoutes);


app.use((request, response) => {
   response.status(400).json({ message: "Rota não encontrada" })
})

app.listen(PORT, () => {
   console.log("Servidor on PORT:" + PORT)
})