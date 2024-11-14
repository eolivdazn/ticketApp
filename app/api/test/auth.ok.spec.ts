import request from 'supertest';
const csrfToken = '38e95149452364e3ea8e3663ab2881725a5d9f52c0b161760f6958ea07c16337';
const callbackUrl = 'http://localhost:3000/';
const username = 'eterra1';
const password = '123';


describe('POST /api/auth/callback/password', () => {
  it('should authenticate the user', async () => {
    const response = await request('http://localhost:3000')
      .post('/api/auth/callback/password')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Cookie', `next-auth.csrf-token=${csrfToken}|9ae09dbacb0d0b9807cdb1dac918626285dcb27f348b48b27148913b1af405f1; next-auth.callback-url=${encodeURIComponent(callbackUrl)}`)
      .send(`csrfToken=${csrfToken}&username=${username}&password=${password}`);

    expect(response.status).toBe(302); // or whatever status you expect
    const token = response.headers['set-cookie'][0];
  });
});
