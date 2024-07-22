import mysql from "mysql2"

//create Pool 
const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE, 
    port: process.env.MYSQL_PORT
})


// conn.connect((err)=>{
//     if(err){
//         console.error(err.stack)
//     }

//     console.log("MySql Conectado")
// })

 export default conn;