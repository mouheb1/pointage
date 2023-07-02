import connectToDatabase from "../config/database";
import { Employee } from "../models/Employee";

class EmployeeService {
    async createEmployee(employee: Employee) {
        const db = await connectToDatabase();

        // Insert the employee into the "employees" table
        await db.run(
            'INSERT INTO employees (id, name, firstName, dateCreated, department) VALUES (?, ?, ?, ?, ?)',
            [
                employee.id,
                employee.name,
                employee.firstName,
                employee.dateCreated,
                employee.department,
            ]
        );

        return employee;
    }

    async getEmployees(date?: string): Promise<Employee[]> {
        const db = await connectToDatabase();

        let query = 'SELECT * FROM employees';

        // Add condition if date is provided
        if (date) {
            query += ' WHERE dateCreated = ?';
        }

        // Retrieve all employees from the "employees" table
        const employees: Employee[] = await db.all<Employee[]>(
            query,
            date ? [date] : []
        );
        return employees;
    }

    async getEmployeeById(id: string): Promise<Employee> {
        const db = await connectToDatabase();
        // Retrieve get employee by id from the "employees" table
        const employee: Employee = await db.get<Employee>(
            'SELECT * FROM employees WHERE id = ?',
            id ? [id] : []
        );
        return employee;
    }
}

export const employeeService = new EmployeeService