import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: string;
  iat: string;
  exp: string;
}

export default function AuthMiddleware(
  req: Request, 
  res: Response, 
  next: NextFunction
  ) {
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, 'secret');

      const { id } = data as ITokenPayload;

      req.userId = id;

      return next();
    } catch {
      return res.sendStatus(401);
    }
  }