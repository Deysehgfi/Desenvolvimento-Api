import conn from "../config/conn.js"

const tableEmprestimos = `

    CREATE TABLE IF NOT EXISTS emprestimos(
        id int primary key auto_increment,
        id_cliente varchar(60) not null,
        id_livro varchar(60) not null,
        data_emprestimo date not null,
        data_devolucao date not null,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp on update current_timestamp,
        foreign key (id_cliente) references clientes(cliente_id),
        foreign key (id_livro) references livros(livro_id)
    );
    `


conn.query(tableEmprestimos, (err)=>{
    if(err){
        console.error("Erro ao criar tabela")
        return
    }

    console.log("Tabela [ Emprestimos ] criada com sucesso")
})