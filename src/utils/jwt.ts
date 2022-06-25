import { Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const secret = process.env.JWT_SECRET || '';

export function setUserToken(res: Response, user: any) {
  const token = jwt.sign(user, secret);
  res.cookie('token', token);
}
