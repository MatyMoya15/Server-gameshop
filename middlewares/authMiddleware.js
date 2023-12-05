const expressJwt = require('express-jwt');
const { JWT_SECRET } = process.env;

const authenticateJWT = expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] });

module.exports = authenticateJWT;