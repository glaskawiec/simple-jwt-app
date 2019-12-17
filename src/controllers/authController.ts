import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth';

const authController = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(410).send();
  }

  try {
    const user = verifyToken(token);

    if (!user) {
      return res.status(410).send();
    }
    res.locals.email = user.email;
    return next();
  } catch {
    return res.status(410).send();
  }
};

export default authController;
