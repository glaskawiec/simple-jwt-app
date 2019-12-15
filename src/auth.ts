import jwt from 'jsonwebtoken';
import { add, isValid } from './tokensStorage';
import { JWT_SECRET } from '../config';

export const generateToken = (payload: object, expiresIn: string): string => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  add(token);

  return token;
};

export const verifyToken = (token: string): any => {
  if (!isValid(token)) {
    return false;
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return false;
  }
};
