import conn from "../config/conn.js";


const tableUsuario = `
CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario varchar(60) primary key,
    nome varchar(255) not null,
    email varchar(255) not null,
    telefone varchar(255) not null,
    senha varchar(255) not null,
    image varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp 
);
`

conn.query(tableUsuario, (err)=>{
    if(err){
        console.error("erro ao criar a tabela usuarios")
        return;
    }

    console.log("Tabela [ usuarios ] criada com sucesso")
})