import request from 'supertest';
import app from './app';


describe('GET /', () => {
  it('responds with hello world', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });


  it('Should be 404 if asked for other route', async () => {
    const response = await request(app).get('/other');
    expect(response.statusCode).toBe(404);
    expect(response.text).toMatch(/Not found/);
  });
});
