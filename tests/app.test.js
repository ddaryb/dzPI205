 const request = require('supertest');
const app = require('../index');

describe('API Tests', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Welcome');
  });

  it('should fetch users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });

  it('should fetch single user', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name');
  });

  it('should return 404 for non-existent user', async () => {
    const res = await request(app).get('/users/9999');
    expect(res.statusCode).toEqual(404);
  });
});