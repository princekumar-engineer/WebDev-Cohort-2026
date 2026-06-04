import request from 'supertest';
import { createApp } from '../../src/app.js';

describe('Test 1: Health Check', () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  describe('GET /health', () => {
    it('should return 200 with ok: true', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ok: true });
    });
  });
});
