import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

async function connectToDatabase() {
    const db: Database<sqlite3.Database, sqlite3.Statement> = await open({
        filename: './db/database.db',
        driver: sqlite3.Database
    });

    // Create the "employees" table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS employees (
            id TEXT PRIMARY KEY,
            name TEXT,
            firstName TEXT,
            dateCreated TEXT,
            department TEXT
    )`
    );
    await db.exec(`
        CREATE TABLE IF NOT EXISTS clocking (
            id TEXT PRIMARY KEY,
            employee_id TEXT,
            check_in TEXT,
            check_out TEXT,
            comment TEXT,
            duration TEXT
    )`
    );

    return db;
}

export = connectToDatabase;
