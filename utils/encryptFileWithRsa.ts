import fs from 'fs';
import { Crypt } from 'hybrid-crypto-js';

const encryptFileWithRsa = (filePath: string, publicKey: string) => {
  const pdfBase64 = fs.readFileSync(filePath).toString('base64');
  const entropy = 5435342;
  const crypt = new Crypt({ entropy });

  return crypt.encrypt(publicKey, pdfBase64);
};

export default encryptFileWithRsa;
