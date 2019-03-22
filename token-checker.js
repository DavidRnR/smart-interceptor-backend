const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = (req, res, next) => {
    // Get Token after Bearer
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    'error': true,
                    'message': 'Unauthorized access.'
                });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            'error': true,
            'message': 'No token provided.'
        });
    }
}