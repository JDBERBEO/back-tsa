import { NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import express, {Request, Response} from 'express';

// interface Response {
//   adminId: JwtPayload,
//   admin: object
// }
export interface CustomRequest extends Request {
  user: string | JwtPayload;
 }

export const auth = (req: Request, res:Response, next: NextFunction) => {
  try {
    const {authorization} = req.headers
    if (!authorization) {
      throw new Error('Your session has expired');
    }
    const [_, token] = authorization.split(' ');

    if (!token) {
      throw new Error('Your session has expired');
    }
    const {userId}: any = jwt.verify(token, '' + process.env.SECRET);

    (req as CustomRequest).user = userId;
    next();
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
