import { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unautorized - No token provided.',
    });
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, jwtSecret);

    // si decoded no es un objeto o no contiene id
    if (typeof decoded !== 'object' || !('id' in decoded)) {
      throw new Error();
    }

    req.userId = String(decoded.id);
    next();
  } catch (error) {
    return res.status(403).json({
      message: 'Forbidden - Invalid or expired token',
    });
  }
};
