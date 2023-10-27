const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const jwtValidation = (req, res, next) => {
    const token = req.header('auth_token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET || 'venti@super_secret#string');
        req.user = verified;
        next(); // continuamos
    } catch (error) {
        res.status(400).json({ error: 'token no es válido' });
    }
}

module.exports = jwtValidation;