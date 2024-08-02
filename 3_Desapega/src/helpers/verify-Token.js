import jwt from "jsonwebtoken"
import getToken from "./get-token.js"

const verifyToken = (request, response, next) => {
    if (!request.headers.authorization) {
        response.status(401).json({ message: "Acesso bloqueado" })
        return;
    }

    const token = getToken(request)
    if (!token) {
        response.status(401).json({ message: "Acesso bloqueado" })
    }
    try {
        const verified = jwt.verify(token, "SENHASUPERSEGURAEDIFICIL")
        request.usuario = verified;
        next()
    } catch (err) {
        response.status(400).json({ err: "Token Inválido" })
    }

}

export default verifyToken;