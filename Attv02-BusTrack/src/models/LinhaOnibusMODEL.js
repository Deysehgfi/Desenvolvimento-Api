import conn from "../config/conn.js"

const tableLinhaOnibus = `
  CREATE TABLE IF NOT EXISTS linhas(
    id_Linha varchar(60) primary key not null,
    nome varchar(255) not null,
    numero_linha int not null,
    intinerario varchar(255) not null
    );
`


conn.query(tableLinhaOnibus,(err)=>{
    if(err){
        console.error("Erro ao criar a tabela LinhasOnibus")
        return
    }

    console.log("Tabela [ linhas ] criada com sucesso")
})