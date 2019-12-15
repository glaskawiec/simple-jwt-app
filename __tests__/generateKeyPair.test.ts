import supertest from 'supertest';
import { expect } from 'chai';
import server from '../src/server';
import generateRsaKeys from '../utils/generateRsaKeys';
import { generateToken, signIn } from '../src/auth';

describe('POST /api/generate-key-pair', () => {
  afterEach(() => {
    server.close();
  });

  it('should return gone error (410) when jwt token is not passed.',
    (done) => supertest(server)
      .post('/api/generate-key-pair')
      .expect(410, done));


  it('should return gone error (410) when jwt token is expired.',
    (done) => {
      const expiredToken = generateToken({ email: 'example@mail.com' }, '-10s');

      return supertest(server)
        .post('/api/generate-key-pair')
        .set('Authorization', expiredToken)
        .expect(410, done);
    });

  it('should return gone error (410) when jwt token is not valid.',
    (done) => supertest(server)
      .post('/api/generate-key-pair')
      .set('Authorization', 'notValidToken')
      .expect(410, done));

  it('should return success when passed token is valid and keys are passed in body.',
    (done) => {
      const email = 'example@mail.com';
      const token = signIn(email, '1234');
      const { pubKey, privKey } = generateRsaKeys();

      return supertest(server)
        .post('/api/generate-key-pair')
        .set('Authorization', `${token}`)
        .send(
          {
            privKey,
            pubKey,
          },
        )
        .then((response) => {
          expect(response.status).to.be.equal(200);
          expect(response.header['content-type']).to.be.equal('application/json; charset=utf-8');
          expect(response.body.privKey).to.be.equal(privKey);
          expect(response.body.pubKey).to.be.equal(pubKey);
          done();
        });
    });
});
