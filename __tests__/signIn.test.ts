import supertest from 'supertest';
import { expect } from 'chai';
import server from '../src/server';
import { verifyToken } from '../src/auth';

describe('POST /api/sign-in', () => {
  afterEach(() => {
    server.close();
  });

  it('should return valid JWT token when passed credentials are valid.',
    (done) => supertest(server)
      .post('/api/sign-in')
      .send(
        {
          email: 'example@mail.com',
          password: '1234',
        },
      )
      .expect(200)
      .then((res) => {
        expect(res.body.authToken).to.be.a('string');
        expect(verifyToken(res.body.authToken)).to.be.deep.equal({ email: 'example@mail.com' });
        done();
      }));

  it('should return bad request error when passed credentials are not valid.',
    (done) => supertest(server)
      .post('/api/sign-in')
      .send(
        {
          email: 'example@mail.com',
          password: 'wrongPassword',
        },
      )
      .expect(400, done));
});
