import jwt from 'jsonwebtoken';
import {
  associateToken, searchUser, isTokenValid,
} from './usersDatabase';
import { JWT_SECRET } from '../config';

export const generateToken = (payload: object, expiresIn: string = '1h'): string => jwt.sign(payload, JWT_SECRET, { expiresIn });

export const signIn = (email: string, password: string) => {
  const user = searchUser(email, password);

  if (user) {
    const token = generateToken({ email }, '1h');
    associateToken(email, token);
    return token;
  }
  return false;
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);


    if (typeof decoded === 'object') {
      // @ts-ignore
      const { email } = decoded;

      if (isTokenValid(email, token)) {
        return { email };
      }
    }
  } catch (err) {
    return false;
  }
};
