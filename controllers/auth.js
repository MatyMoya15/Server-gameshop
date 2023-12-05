const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

const protegerRuta = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'No hay token, acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.usuario = decoded.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Token no válido' });
    }
};


module.exports = { generateToken, verifyToken, protegerRuta };
