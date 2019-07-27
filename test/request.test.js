import request from 'supertest';
import app from '../server';

describe('test request', () => {
  test('respond to default page', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
