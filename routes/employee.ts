import { Request, Response, Router } from 'express';
import { Employee } from '../models/Employee';
import { employeeService } from '../services/Employee';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         firstName:
 *           type: string
 *         dateCreated:
 *           type: string
 *           format: date-time
 *         department:
 *           type: string
 * 
 *     CreateEmployee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         firstName:
 *           type: string
 *         dateCreated:
 *           type: string
 *           format: date-time
 *         department:
 *           type: string
 * 
 *     EmployeesResponse:
 *       type: object
 *       properties:
 *         employees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Employee'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create an employee
 *     description: Create a new employee with the provided details
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', async function (req: Request, res: Response) {
  try {
    const employee: Employee = await employeeService.createEmployee(
      Object.assign(new Employee({
        ...req.body,
        id: uuidv4(),
        dateCreated: moment().format('YYYY-MM-DDTHH:mm:ss')
      })
      )
    )
    return res.status(201).json({ employee })
  } catch (error) {
    return res.send(error)
  }
});

/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get employees
 *     description: Get employees based on the specified date
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeesResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async function (req: Request, res: Response) {
  try {
    const date: string = req.body.date && moment(req.body.date).format('YYYY-MM-DD')
    const employees: Employee[] = await employeeService.getEmployees(date)
    return res.status(200).json({ employees })
  } catch (error) {
    return res.send(error)
  }
});

export default router;
