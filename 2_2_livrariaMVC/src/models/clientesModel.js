import conn from "../config/conn.js"

const tableClientes = `
    CREATE TABLE IF NOT EXISTS clientes(
    cliente_id varchar(60) primary key,
    nome varchar(255) not null,
    email varchar(255) not null,
    image varchar(255) not null,
    password varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);`


conn.query(tableClientes, (err, result, field)=>{
    if(err){
        console.error("Erro ao criar a tabela")
        return
    }

    console.log('Tabela [ Clientes ] criada com sucesso')
})