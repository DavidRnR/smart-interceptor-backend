import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JWT_CONFIG } from '../config/config';

interface RequestDecoded extends Request {
  decoded?: string | jwt.JwtPayload;
}

export default (req: RequestDecoded, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).send({
      message: 'No token provided or incorrect token format.',
    });
  }

  // Get Token after Bearer
  const token = authHeader.split(' ')[1];
  if (token) {
    jwt.verify(token, JWT_CONFIG.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Unauthorized access.',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};
