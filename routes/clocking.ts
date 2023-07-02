import { Request, Response, Router } from 'express';
import { Clocking } from '../models/Clocking';
import { clockingService } from '../services/Clocking';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { employeeService } from '../services/Employee';

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCheckIn:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         employee_id:
 *           type: string
 *         check_in:
 *           type: string
 *           format: date-time
 *         comment:
 *           type: string
 *
 *     Clocking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         employee_id:
 *           type: string
 *         check_in:
 *           type: string
 *           format: date-time
 *         check_out:
 *           type: string
 *           format: date-time
 *         comment:
 *           type: string
 *         duration:
 *           type: string
 */

/**
 * @swagger
 * /check-in:
 *   post:
 *     summary: Create a check-in
 *     description: Create a new check-in for an employee
 *     tags:
 *       - Clocking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCheckIn'
 *     responses:
 *       201:
 *         description: Check-in created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clocking'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/check-in', async function (req: Request, res: Response) {
  try {
    const { employee_id } = req.body

    const employee = await employeeService.getEmployeeById(employee_id)

    if (!employee) {
      throw new Error('Employee ID doesn\'t exist')
    }

    const lastClocking = await clockingService.getLastClocking(employee_id, moment().format('YYYY-MM-DD'))

    if (lastClocking && lastClocking.check_in && !lastClocking.check_out) {
      throw new Error('you need to check_out first')
    }

    const clocking: Clocking = await clockingService.createClocking(
      Object.assign(new Clocking({
        ...req.body,
        id: uuidv4(),
        check_in: moment().format('YYYY-MM-DDTHH:mm:ss')
      })
      )
    )
    return res.status(201).json({ clocking })
  } catch (error) {
    return res.status(400).send(error.message)
  }
});

/**
 * @swagger
 * /check-out:
 *   post:
 *     summary: Create a check-out
 *     description: Create a new check-out for an employee
 *     tags:
 *       - Clocking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCheckOut'
 *     responses:
 *       201:
 *         description: Check-out created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClockingResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/check-out', async function (req: Request, res: Response) {
  try {
    const { employee_id } = req.body

    const employee = await employeeService.getEmployeeById(employee_id)

    if (!employee) {
      throw new Error('Employee ID doesn\'t exist')
    }

    const lastClocking = await clockingService.getLastClocking(employee_id, moment().format('YYYY-MM-DD'))

    if (!lastClocking || lastClocking && lastClocking.check_out) {
      throw new Error('you need to check_in first')
    }

    const newCheckOut = moment().format('YYYY-MM-DDTHH:mm:ss')
    const check_in = moment(lastClocking.check_in);
    const check_out = moment(newCheckOut);

    const duration = moment.duration(check_out.diff(check_in));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const clocking: Clocking = await clockingService.updateClockingCheckOut(
      {
        ...lastClocking,
        ...req.body,
        check_out: newCheckOut,
        duration: `${hours}h ${minutes}m ${seconds}s`
      }
    )
    return res.status(201).json({ clocking })
  } catch (error) {
    return res.status(400).send(error.message)
  }
});
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get clockings
 *     description: Get clockings for an employee
 *     tags:
 *       - Clocking
 *     parameters:
 *       - in: query
 *         name: employee_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClockingsResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', async function (req: Request, res: Response) {
  try {
    const employee_id: string = req.body.employee_id
    if (!employee_id) {
      throw new Error('Employee ID is required')
    }

    const clockings: Clocking[] = await clockingService.getClockings(employee_id)
    return res.status(200).json({ clockings })
  } catch (error) {
    return res.status(400).send(error.message)
  }
});

export default router;
