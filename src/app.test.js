const request = require('supertest');
const app = require('./app');

beforeAll(() => {
  // Add a test route to simulate error for testing error handling middleware
  app.get('/error', (req, res, next) => {
    next(new Error('Test error'));
  });
});

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Welcome to our Express API!');
  });
});

describe('Error handling middleware', () => {
  it('should handle errors and return 500 status', async () => {
    const res = await request(app).get('/error');
    expect(res.statusCode).toEqual(500);
    expect(res.text).toEqual('Something broke!');
  });
});
