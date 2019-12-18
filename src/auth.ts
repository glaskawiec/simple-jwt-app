import jwt from 'jsonwebtoken';
import {
  associateToken, searchUser, isTokenValid,
} from './usersDatabase';
import { JWT_SECRET } from '../config';
import TokenPayload from './interfaces/TokenPayload';

export const generateToken = (payload: object, expiresIn: string = '1h'): string => jwt.sign(payload, JWT_SECRET, { expiresIn });

export const signIn = (email: string, password: string): string => {
  const user = searchUser(email, password);

  if (user) {
    const token = generateToken({ email }, '1h');
    associateToken(email, token);
    return token;
  }
  return null;
};

export const verifyToken = (token: string): TokenPayload => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }

  const { email } = decoded;

  if (email && isTokenValid(email, token)) {
    return { email };
  }
  return null;
};
