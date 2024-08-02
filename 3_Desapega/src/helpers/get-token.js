
const getToken = (request) => {
    const authHeader = request.headers.authorization
    const token = authHeader.split('')[1];
console.log("Token:", token)
    return token;
};

export default getToken;