import request from 'supertest';
import { app } from '..';

describe('Employee API Tests', () => {
  test('should create a new employee', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        id: '0fa6f55b-3477-4649-9a35-5834e14ee236',
        name: 'Bouazra Mouheb',
        firstName: 'Mouheb',
        dateCreated: new Date(),
        department: 'IT',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('employee');
  });

  test('should get employees based on the specified date', async () => {
    const response = await request(app)
      .get('/employee')
      .query({ date: '2023-07-01' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('employees');
  });
});
