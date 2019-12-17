import { Request, Response } from 'express';
import { signIn } from '../auth';

const signInController = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const authToken = signIn(email, password);

  if (authToken) {
    res.status(200).send({ authToken });
  } else {
    res.status(400).send();
  }
};

export default signInController;
