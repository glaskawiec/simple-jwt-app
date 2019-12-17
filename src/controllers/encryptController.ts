import { Request, Response } from 'express';
import { getKeys } from '../usersDatabase';
import encryptFileWithRsa from '../../utils/encryptFileWithRsa';

const encryptController = (req: Request, res: Response) => {
  const { email } = res.locals;

  const { pubKey } = getKeys(email);

  const encryptedBase64 = encryptFileWithRsa('./assets/sample.pdf', pubKey);

  res.status(200).json({ encryptedBase64 });
};

export default encryptController;
