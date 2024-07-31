 const validarUsuario = (request, response, next) => {

    const { nome, email, telefone, senha, confirmsenha } = request.body

    if (!nome) {
        response.status(400).json({ message: "O nome é obrigatório" })
        return;
    }

    if (!email) {
        response.status(400).json({ message: "O email é obrigatório" })
        return;
    }

    if (!telefone) {
        response.status(400).json({ message: "O telefone é obrigatório" })
        return
    }

    if (!senha) {
        response.status(400).json({ message: "O senha é obrigatório" })
        return
    }

    if (!confirmsenha) {
        response.status(400).json({ message: "A confirmação de senha é obrigatória" })
        return
    }

    //validação do email
    if (!email.includes("@")) {
        response.status(409).json({ message: "É necessario que obtenha @ no email" })
        return
    }

    //confimação de senha
    if (senha !== confirmsenha) {
        response.status(409).json({ message: "A senha e a confirmação deve ser iguais" })
        return
    }

    next()

};



export default validarUsuario;