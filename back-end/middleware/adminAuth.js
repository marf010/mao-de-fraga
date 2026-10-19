const jwt = require('jsonwebtoken');

function adminAuth(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Não autenticado'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Token não fornecido'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!decoded.admin) {
            return res.status(403).json({
                message: 'Acesso negado'
            });
        }

        req.admin = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Token inválido ou expirado'
        });

    }
}

module.exports = adminAuth;