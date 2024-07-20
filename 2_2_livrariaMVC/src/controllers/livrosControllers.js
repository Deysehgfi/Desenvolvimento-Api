import conn from "../config/conn.js";
import {v4 as uuidv4} from 'uuid'


export const getLivros = (request, response)=>{
    const sql = `SELECT * FROM livros`
    conn.query(sql, (err, data)=>{
       if(err){
           response.status(500).json({message: "Erro ao buscar livros"})
           return;
       }

       const livros = data
       response.status(200).json(livros)
    })
};
export const cadastrarLivro = (request, response)=>{
    // response.status(404).json({message:"Rota não encontrada"})
    const {titulo, autor, ano_publicacao, genero, preco} = request.body;  
    // validades
    if(!titulo){
      response.status(400).json({message:"O titulo é obrigatorio"})
      return
    }
    if(!autor){
     response.status(400).json({message:"O autor é obrigatorio"})
     return
    }
    if(!ano_publicacao){
     response.status(400).json({message:"O ano publicação é obrigatório"})
     return
    }
    if(!genero){
     response.status(400).json({message:"O genero é obrigatório"})
     return
    }
    if(!preco){
     response.status(400).json({message:"O preço é obrigatório"})
     return
    }
    
    // cadastrar um livro -> antes preciso saber se esse livro existe 
    const checkSql = /*sql*/  `SELECT * FROM livros WHERE titulo ="${titulo}" AND
    autor = "${autor}" AND 
    ano_publicacao = "${ano_publicacao}"`
    conn.query(checkSql, (err, data)=>{
    if(err){
     response.status(500).json({message:"Erro ao buscar livros"})
     return console.log(err); 
    }
     
    if(data.length > 0){
     response.status(409).json({message: "Livro já existe na livraria"}); 
     return console.log(err); 
    }
    
    const id = uuidv4()
    const disponibilidade = 1
    
    // inserir dados
    const insertSql = /*sql*/ `INSERT INTO livros 
    (id, titulo, autor, ano_publicacao, genero, preco, disponibilidade)
    VALUES ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")` 
    conn.query(insertSql, (err)=>{
     if(err){
         response.status(500).json({message:"Erro ao cadastrar livro"}); 
     }
     response.status(201).json({message:"Livro cadastrado"})
    })
    }); 
};
export const buscarLivro = (request, response)=>{
    const {id} = request.params //para extrair i id do paramentros
   
    const sql = /*sql */ `SELECT * FROM livros WHERE id = "${id}"`
   
    conn.query(sql, (err, data)=>{
       if(err){
           console.error(err)
           response.status(500).json({message: "Erro ao buscar livro"})
           return
       }
   
   
       //se o array data retorna 0 o livro n existe
       if(data.length === 0){
   response.status(404).json({message: "Livro não encontrado"})
       }
   
       const livro = data[0] // para retornar em objeto
       response.status(200).json(livro)
    })
};
export const editarLivro = (request, response)=>{
    const {id} = request.params

    const { titulo, autor, ano_publicacao , genero, preco, disponibilidade} = request.body;

    //validações 
    if(!titulo){
        response.status(400).json({message: 'O titulo é obrigatório'})
        return
    }
    if(!autor){
        response.status(400).json({message: 'O autor é obrigatório'})
        return
    }
    if(!genero){
        response.status(400).json({message: 'O genero é obrigatório'})
        return
    } 
    if(!ano_publicacao){
        response.status(400).json({message: 'O ano de publicação é obrigatório'})
        return
    } 
    if(!preco){
        response.status(400).json({message: 'O preco é obrigatório'})
        return
    } 
    if(disponibilidade === undefined){
        response.status(400).json({message: 'A disponibilidade é obrigatória'})
        return
    } 



//checar se existe no sql
    const checkSql = /*sql */ `SELECT * FROM livros WHERE id = "${id}"` 
    conn.query(checkSql, (err, data)=>{
        if(err){
            console.error(err)
            response.status(500).json({message: ""})
        }

        if(data.length === 0 ){
           return response.status(404).json({message:"Livro não encontrado"})
        }

        const updateSql = /*sql */ `UPDATE livros SET titulo = "${titulo}" , autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}" WHERE  id = "${id}"`


        conn.query(updateSql,(err)=>{
            if(err){
                console.error(err)
                response.status(500).json({message: "Erro ao atualizar livros"})
                return
            }

            response.status(200).json({message: "livro atualizado"})
        })
    })
}
export const deletarLivro = (request, response)=>{
    const {id} = request.params;

    const deleteSql = `DELETE * FROM WHERE id = "${id}"`

    conne.query(deleteSql, (err, info)=>{
        if(err){
            response.status(500).json({message:  "Erro ao deletar o livro"})
            return
        }

        if(info.affectedRows === 0 ){
            response.status(404).json({message: "Livro não encontrado"})
            return
        }
        console.log(info)

        response.status(200).json({message: "o Livro selecionado foi deletado"})
    })
}
