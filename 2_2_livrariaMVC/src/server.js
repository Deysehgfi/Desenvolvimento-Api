import "dotenv/config"
import express from "express"

//conexão com banco de dados
import conn from "./config/conn.js";

//Importação dos modulos e criação das tabelas
import "./models/livroModel.js"
import "./models/clientesModel.js" //
import "./models/emprestimosModel.js"

//Immportação da ROtas 
import livrosRoutes from "./routes/livrosRoutes.js"
import clientesRoutes from "./routes/clientesRoutes.js" // import rotas dos clientes
import emprestimosRoutes from "./routes/emprestimosRoutes.js"
 


const PORT = process.env.PORT

const app = express();


//Midleware -> utilizado para que o express aceite objetos json
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//utilização da routes
app.use("/livros", livrosRoutes);
app.use("/clientes", clientesRoutes); // 
app.use("/emprestimos", emprestimosRoutes); 


app.get("/", (request, response) => {
response.send('ola mundo')
})


app.listen(PORT,()=>{
    console.log("servidor on PORT:",PORT)
})