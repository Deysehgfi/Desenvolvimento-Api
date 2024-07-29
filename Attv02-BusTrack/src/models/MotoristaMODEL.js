import conn from "../config/conn.js"

const tableMotorista = `
    CREATE TABLE IF NOT EXISTS motorista (
        id_motorista varchar(60) primary key not null,
        nome varchar(255) not null,
        data_nascimento date not null,
        numero_carteira_habilitacao varchar(60) not null
    );
`

conn.query(tableMotorista, (err) => {
    if (err) {
        console.error("error ao criar a tabela motorista")
        return;
    }

    console.log("Tabela [ motorista ] criada com sucesso")
})