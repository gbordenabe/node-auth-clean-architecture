import { Response, Request, NextFunction } from 'express';

export class AuthMiddleware {
  static /* async */ validateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({ error: 'Unauthorized' });
    console.log(authorization);
    if (!authorization.startsWith('Bearer '))
      return res.status(401).json({ error: 'Invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      /* const payload = */

      req.body.token = token;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
