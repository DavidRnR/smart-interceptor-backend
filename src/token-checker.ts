import jwt from 'jsonwebtoken';
import config from './config';

export default (req: any, res: any, next: any) => {
    // Get Token after Bearer
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, config.secret, (err: any, decoded: any) => {
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