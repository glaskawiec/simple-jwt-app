import supertest from 'supertest';
import { expect } from 'chai';
import server from '../src/server';
import encryptFileWithRsa from '../utils/encryptFileWithRsa';
import generateRsaKeys from '../utils/generateRsaKeys';
import { generateToken, signIn } from '../src/auth';
import { associateKeys } from '../src/usersDatabase';


describe('POST /api/encrypt', () => {
  afterEach(() => {
    server.close();
  });

  it('should return gone error (410) when jwt token is not passed.',
    (done) => {
      supertest(server)
        .post('/api/encrypt')
        .expect(410, done);
    });

  it('should return gone error (410) when jwt token is expired.',
    (done) => {
      const expiredToken = generateToken({ email: 'example@mail.com' }, '-10s');

      supertest(server)
        .post('/api/encrypt')
        .set('Authorization', expiredToken)
        .expect(410, done);
    });

  it('should return gone error (410) when jwt token is not valid.',
    (done) => {
      supertest(server)
        .post('/api/encrypt')
        .set('Authorization', 'notValidToken')
        .expect(410, done);
    });

  it('should return encrypted base64 code of sample PDF with public key of authorized user.',
    (done) => {
      const email = 'example@mail.com';
      const token = signIn(email, '1234');
      const { pubKey, privKey } = generateRsaKeys();
      const encryptedBase64 = encryptFileWithRsa('./assets/sample.pdf', pubKey);

      associateKeys(email, privKey, pubKey);

      supertest(server)
        .post('/api/encrypt')
        .set('Authorization', `${token}`)
        .then((response) => {
          expect(response.status).to.be.equal(200);
          expect(typeof response.body.encryptedBase64).to.be.equal('string');
          expect(response.body.encryptedBase64.keys).to.be.equal(encryptedBase64.keys);
          expect(response.body.encryptedBase64.iv).to.be.equal(encryptedBase64.iv);
          done();
        });
    });
});
