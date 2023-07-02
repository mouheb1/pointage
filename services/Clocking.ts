import connectToDatabase from "../config/database";
import { Clocking } from "../models/Clocking";

class ClockingService {
    async createClocking(clocking: Clocking) {
        const db = await connectToDatabase();

        // Insert the clocking into the "clocking" table
        await db.run(
            'INSERT INTO clocking (id, employee_id, check_in, check_out, comment) VALUES (?, ?, ?, ?, ?)',
            [
                clocking.id,
                clocking.employee_id,
                clocking.check_in,
                clocking.check_out,
                clocking.comment,
            ]
        );

        return clocking;
    }

    async updateClockingCheckOut(clocking: Clocking): Promise<Clocking> {
        const db = await connectToDatabase();

        let query = `UPDATE clocking SET check_out = ?, duration = ?`;
        const parameters = [clocking.check_out, clocking.duration];

        if (clocking.comment) {
            query += `, comment = ?`;
            parameters.push(clocking.comment);
        }

        query += ` WHERE id = ?`;
        parameters.push(clocking.id);

        await db.run(query, parameters);

        return clocking;
    }

    async getClockings(employee_id: string, date?: string): Promise<Clocking[]> {
        const db = await connectToDatabase();

        let query = 'SELECT * FROM clocking WHERE employee_id = ?'

        if (date) {
            query += ' AND DATE(check_in) = ?'
        }

        // Retrieve all Clockings from the "clocking" table
        const Clockings: Clocking[] = await db.all<Clocking[]>(
            query,
            date ? [employee_id, date] : [employee_id]
        );
        return Clockings;
    }

    async getLastClocking(employee_id: string, date?: string): Promise<Clocking> {
        const db = await connectToDatabase();

        // Retrieve all Clockings from the "clocking" table
        const Clocking: Clocking = await db.get<Clocking>(
            'SELECT * FROM clocking WHERE employee_id = ? AND DATE(check_in) = ? ORDER BY check_in DESC',
            [employee_id, date]
        );
        return Clocking;
    }
}

export const clockingService = new ClockingService