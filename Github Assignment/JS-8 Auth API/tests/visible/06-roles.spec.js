import request from 'supertest';
import { createApp } from '../../src/app.js';
import { User } from '../../src/models/user.model.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

describe('Test 6: Role-Based Authorization', () => {
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

  const regularUser = {
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password123',
  };

  const adminUser = {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'adminpass123',
  };

  let userToken;
  let adminToken;
  let userId;

  beforeEach(async () => {
    const userRegister = await request(app)
      .post('/api/auth/register')
      .send(regularUser);

    userId = userRegister.body.user._id;

    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: regularUser.email, password: regularUser.password });

    userToken = userLogin.body.token;

    const adminRegister = await request(app)
      .post('/api/auth/register')
      .send(adminUser);

    await User.findByIdAndUpdate(adminRegister.body.user._id, { role: 'admin' });

    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: adminUser.email, password: adminUser.password });

    adminToken = adminLogin.body.token;
  });

  describe('GET /api/users', () => {
    it('should allow admin to list all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.users).toBeDefined();
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users.length).toBeGreaterThan(0);
    });

    it('should return 403 when regular user tries to list users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toMatch(/forbidden/i);
    });

    it('should return 401 when no token is provided', async () => {
      const response = await request(app).get('/api/users');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeDefined();
    });

    it('should not include passwords in user list', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      response.body.users.forEach((user) => {
        expect(user.password).toBeUndefined();
      });
    });
  });

  describe('GET /api/users/:id', () => {
    it('should allow admin to get user by id', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toBeDefined();
      expect(response.body.user._id).toBe(userId);
      expect(response.body.user.password).toBeUndefined();
    });

    it('should return 403 when regular user tries to get user by id', async () => {
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBeDefined();
    });

    it('should return 404 when user does not exist', async () => {
      const response = await request(app)
        .get('/api/users/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should allow admin to delete user', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();

      const deletedUser = await User.findById(userId);
      expect(deletedUser).toBeNull();
    });

    it('should return 403 when regular user tries to delete user', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toBeDefined();
    });

    it('should return 404 when trying to delete non-existent user', async () => {
      const response = await request(app)
        .delete('/api/users/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('Role validation', () => {
    it('should distinguish between 401 (not authenticated) and 403 (forbidden)', async () => {
      const noTokenResponse = await request(app).get('/api/users');
      expect(noTokenResponse.status).toBe(401);

      const forbiddenResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`);
      expect(forbiddenResponse.status).toBe(403);
    });
  });
});
