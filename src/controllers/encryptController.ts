import { Request, Response } from 'express';
import { getKeys } from '../usersDatabase';
import encryptFileWithRsa from '../../utils/encryptFileWithRsa';
import EncryptResponse from '../interfaces/EncryptResponse';

const encryptController = (req: Request, res: Response): void => {
  const { email } = res.locals;

  const { pubKey } = getKeys(email);

  const encryptedBase64 = encryptFileWithRsa('./assets/sample.pdf', pubKey);

  const responseBody: EncryptResponse = { encryptedBase64 };

  res
    .status(200)
    .json(responseBody);
};

export default encryptController;
