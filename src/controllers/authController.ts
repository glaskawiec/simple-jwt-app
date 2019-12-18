import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth';

const authController = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(410).send();
  }

  let user = null;

  try {
    user = verifyToken(token);
  } catch {
    res
      .status(410)
      .send();
  }

  if (!user) {
    res
      .status(410)
      .send();
  }
  res.locals.email = user.email;
  next();
};

export default authController;
