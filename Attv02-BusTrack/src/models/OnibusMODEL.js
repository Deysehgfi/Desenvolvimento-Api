import conn from "../config/conn.js";

const newLocal = `
CREATE TABLE IF NOT EXISTS onibus (
    id_onibus varchar(60) primary key not null,
    placa varchar(60) not null,
    modelo varchar(255) not null,
    ano_fabricacao year(4) not null,
    capacidade int not null,
    id_linha varchar(60) not null,
    id_motorista varchar(60) not null,

    foreign key (id_linha) references linhas(id_Linha),
    foreign key (id_motorista) references motorista(id_motorista)
);
`;
const tableOnibus = newLocal

conn.query(tableOnibus, (err) => {
    if (err) {
        console.error("Erro ao criar a tabela onibus")
        return;
    }
    console.log("Tabela [ onibus ] criada com sucesso")
})