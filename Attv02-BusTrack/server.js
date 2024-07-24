import "dotenv/config"
import express from "express"

//postman

const PORT = process.env.PORT

//criação de tabelas
import "./src/models/MotoristaMODEL.js"
import "./src/models/OnibusMODEL.js"
import "./src/models/LinhaOnibusMODEL.js"

//importação e rotas
import linhasRoutes from "./src/routes/LinhaOnibus-Routes.js"
import MotoristasRoutes from "./src/routes/Motorista-Routes.js"
import OnibusRoutes from "./src/routes/Onibus-Routes.js"

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())


//utilização de routes
app.use("/linhas", linhasRoutes);
app.use("/motoristas", MotoristasRoutes);
app.use("/onibus", OnibusRoutes);



app.listen(PORT, ()=>{
    console.log("✨ servidor on PORT:", PORT)
})