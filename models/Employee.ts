
export interface CreateEmployee {
    id: string
    name: string
    firstName: string
    dateCreated: Date
    department: string
}

export class Employee {
    id: string;
    name: string;
    firstName: string
    dateCreated: Date;
    department: string;

    constructor(input: CreateEmployee) {
        const { id, name, firstName, dateCreated, department } = input
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.dateCreated = dateCreated;
        this.department = department;
    }
}