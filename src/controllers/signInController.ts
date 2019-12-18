import { Request, Response } from 'express';
import { signIn } from '../auth';
import SignInResponse from '../interfaces/SignInResponse';

const signInController = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  const token = signIn(email, password);

  if (!token) {
    res
      .status(400)
      .send();
  }

  const responseBody: SignInResponse = { authToken: token };

  res
    .status(200)
    .send(responseBody);
};

export default signInController;
