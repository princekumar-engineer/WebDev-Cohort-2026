import request from 'supertest';
import jwt from 'jsonwebtoken';
import { createApp } from '../../src/app.js';
import { User } from '../../src/models/user.model.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

describe('Test 5: Protected Routes & Auth Middleware', () => {
  let app;

  beforeAll(async () => {
    await setupDb();
    process.env.JWT_SECRET = 'test-secret-key-for-jwt';
    process.env.JWT_EXPIRES_IN = '24h';
    app = createApp();
  });

  afterAll(async () => {
    await teardownDb();
  });

  beforeEach(async () => {
    await resetDb();
  });

  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  let authToken;

  beforeEach(async () => {
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });

    authToken = loginResponse.body.token;
  });

  describe('GET /api/auth/me', () => {
    it('should return current user with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.name).toBe(testUser.name);
      expect(response.body.user.password).toBeUndefined();
    });

    it('should return 401 without token', async () => {
      const response = await request(app).get('/api/auth/me');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should return 401 with malformed authorization header', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', authToken); // Missing "Bearer " prefix

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should return 401 with expired token', async () => {
      const expiredToken = jwt.sign(
        { userId: '507f1f77bcf86cd799439011', email: 'test@example.com', role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '0s' }
      );

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should return 401 when user in token does not exist', async () => {
      const fakeToken = jwt.sign(
        { userId: '507f1f77bcf86cd799439011', email: 'fake@example.com', role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${fakeToken}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should not include password in response', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.body.user.password).toBeUndefined();
    });

    it('should include user role in response', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.body.user.role).toBe('user');
    });

    it('should work with different valid tokens', async () => {
      const user2 = {
        name: 'User Two',
        email: 'user2@example.com',
        password: 'password456',
      };

      await request(app).post('/api/auth/register').send(user2);
      const login2 = await request(app)
        .post('/api/auth/login')
        .send({ email: user2.email, password: user2.password });

      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${login2.body.token}`);

      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe(user2.email);
    });
  });
});
