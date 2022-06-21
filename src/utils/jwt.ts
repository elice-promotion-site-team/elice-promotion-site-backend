import { Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || '';

exports.secret = secret;

export function setUserToken(res: Response, user: any) {
  const token = jwt.sign(user, secret);
  res.cookie('token', token);
}
