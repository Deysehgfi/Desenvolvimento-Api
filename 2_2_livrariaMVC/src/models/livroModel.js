import conn from "../config/conn.js"

const tableLivros = `
CREATE TABLE IF NOT EXISTS livros(
    id varchar(60) primary key,
    titulo varchar(255) not null,
    autor varchar(255) not null,
    ano_publicacao year(4) not null,
    genero varchar(255) not null,
    preco decimal(10,2) not null,
    disponibilidade boolean,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);`


conn.query(tableLivros,(err, result, field)=>{
    if(err){
        console.error("Erro ao criar criar a tabela")
        return
    }

    console.log(result)
    console.log(field)
    console.log()
})