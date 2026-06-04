import request from 'supertest';
import jwt from 'jsonwebtoken';
import { createApp } from '../../src/app.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

describe('Test 4: Login & JWT', () => {
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

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(testUser);
    });

    it('should login with correct credentials and return token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.password).toBeUndefined();
    });

    it('should return valid JWT token with correct payload', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);

      expect(decoded.userId).toBeDefined();
      expect(decoded.email).toBe(testUser.email);
      expect(decoded.role).toBe('user');
    });

    it('should return 401 with wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toMatch(/invalid.*credentials/i);
    });

    it('should return 401 with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: testUser.password });

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toMatch(/invalid.*credentials/i);
    });

    it('should not leak information about email existence', async () => {
      const wrongEmailResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: testUser.password });

      const wrongPasswordResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' });

      expect(wrongEmailResponse.body.error.message).toBe(
        wrongPasswordResponse.body.error.message
      );
    });

    it('should allow case-insensitive email login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email.toUpperCase(), password: testUser.password });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should include user id in response', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(response.body.user._id).toBeDefined();
    });

    it('should include user role in response', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });

      expect(response.body.user.role).toBe('user');
    });
  });
});
