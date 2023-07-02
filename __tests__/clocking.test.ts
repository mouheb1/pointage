import request from 'supertest';
import { app } from '..';

describe('API Tests', () => {
  test('should create a check-in for an employee', async () => {
    const response = await request(app)
      .post('/clocking/check-in')
      .send({
        "employee_id": "0fa6f55b-3477-4649-9a35-5834e14ee236",
        "comment": "some comment"
      }); // Send the [employee_id, comment] in the request body


    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('clocking');
  });

  test('should create a check-out for an employee', async () => {
    const response = await request(app)
      .post('/clocking/check-out')
      .send({
        "employee_id": "0fa6f55b-3477-4649-9a35-5834e14ee236",
        "comment": "some comment"
      }); // Send the [employee_id, comment] in the request body

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('clocking');
  });

  test('should return the list of clockings for a valid employee ID', async () => {
    const response = await request(app)
      .get('/clocking')
      .send({ employee_id: '0fa6f55b-3477-4649-9a35-5834e14ee236' }); // Send the employee_id in the request body

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clockings');
  });
});
