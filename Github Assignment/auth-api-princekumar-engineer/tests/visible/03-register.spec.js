import request from 'supertest';
import bcrypt from 'bcryptjs';
import { createApp } from '../../src/app.js';
import { User } from '../../src/models/user.model.js';
import { setupDb, teardownDb, resetDb } from '../__helpers__/setupTestDb.js';

describe('Test 3: User Registration', () => {
  let app;

  beforeAll(async () => {
    await setupDb();
    app = createApp();
  });

  afterAll(async () => {
    await teardownDb();
  });

  beforeEach(async () => {
    await resetDb();
  });

  describe('POST /api/auth/register', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    it('should register a new user with valid data', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(response.status).toBe(201);
      expect(response.body.user).toBeDefined();
      expect(response.body.user.name).toBe(validUser.name);
      expect(response.body.user.email).toBe(validUser.email.toLowerCase());
      expect(response.body.user.password).toBeUndefined();
    });

    it('should hash the password before saving', async () => {
      await request(app).post('/api/auth/register').send(validUser);

      const user = await User.findOne({ email: validUser.email }).select('+password');
      expect(user.password).not.toBe(validUser.password);

      const isValidPassword = await bcrypt.compare(validUser.password, user.password);
      expect(isValidPassword).toBe(true);
    });

    it('should return 409 when email already exists', async () => {
      await request(app).post('/api/auth/register').send(validUser);

      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(response.status).toBe(409);
      expect(response.body.error).toBeDefined();
      expect(response.body.error.message).toMatch(/email.*already.*exists/i);
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUser, email: 'invalid-email' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should require password to be at least 6 characters', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUser, password: '12345' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should require name field', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ email: validUser.email, password: validUser.password });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should require email field', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: validUser.name, password: validUser.password });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should require password field', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: validUser.name, email: validUser.email });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('should set default role to "user"', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(response.body.user.role).toBe('user');
    });

    it('should convert email to lowercase', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUser, email: 'JOHN@EXAMPLE.COM' });

      expect(response.body.user.email).toBe('john@example.com');
    });

    it('should trim name field', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...validUser, name: '  John Doe  ' });

      expect(response.body.user.name).toBe('John Doe');
    });
  });
});
