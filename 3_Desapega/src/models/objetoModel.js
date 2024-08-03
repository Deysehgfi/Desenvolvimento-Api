import conn from "../config/conn.js"

const tableOjeto = `
CREATE TABLE IF NOT EXISTS objetos(
    objeto_id VARCHAR(60) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    peso VARCHAR(255) NOT NULL,
    cor VARCHAR(255) NOT NULL,
    descricao TEXT,
    disponivel BOOLEAN,
    usuario_id varchar(60),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (usuario_id) references usuarios(id_usuario)
)`


conn.query(tableOjeto, (err)=>{
    if(err){
        console.error(err)
        return
    }

    console.log("tabela [ objetos] criada com sucesso ")
})