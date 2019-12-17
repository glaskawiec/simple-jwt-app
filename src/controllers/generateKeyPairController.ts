import { Request, Response } from 'express';
import { associateKeys } from '../usersDatabase';

const generateKeyPairController = (req: Request, res: Response) => {
  const { email } = res.locals;
  const { privKey, pubKey } = req.body;
  associateKeys(email, privKey, pubKey);

  res
    .status(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({
      privKey,
      pubKey,
    });
};

export default generateKeyPairController;
