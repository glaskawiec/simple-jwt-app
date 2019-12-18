import { Request, Response } from 'express';
import { associateKeys } from '../usersDatabase';
import KeysPair from '../interfaces/KeysPair';

const generateKeyPairController = (req: Request, res: Response): void => {
  const { email } = res.locals;
  const { privKey, pubKey } = req.body;

  associateKeys(email, privKey, pubKey);

  const responseBody: KeysPair = {
    privKey,
    pubKey,
  };

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(responseBody);
};

export default generateKeyPairController;
