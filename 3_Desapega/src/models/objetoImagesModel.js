import conn from "../config/conn.js"

const tableOjeto = `
CREATE TABLE IF NOT EXISTS objeto_images(
    image_id VARCHAR(60) PRIMARY KEY,
    image_path VARCHAR(255) NOT NULL,
    objeto_id VARCHAR(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp,
)`


conn.query(tableOjeto, (err)=>{
    if(err){
        console.error(err)
        return
    }

    console.log("tabela [ objeto_images ] criada com sucesso ")
})