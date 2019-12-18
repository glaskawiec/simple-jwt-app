import { generateKeyPairSync } from 'crypto';
import KeysPair from '../src/interfaces/KeysPair';

const generateRsaKeys = (): KeysPair => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret',
    },
  });

  return {
    privKey: privateKey,
    pubKey: publicKey,
  };
};

export default generateRsaKeys;
