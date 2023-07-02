
export interface CreateClocking {
    id: string;
    employee_id: string
    check_in: string
    check_out: string
    comment: string
    duration: string;
}

export class Clocking {
    id: string;
    employee_id: string;
    check_in: string
    check_out: string;
    comment: string;
    duration: string;

    constructor(input: CreateClocking) {
        const { id, employee_id, check_out, check_in, comment, duration } = input
        this.id = id;
        this.employee_id = employee_id;
        this.check_in = check_in;
        this.check_out = check_out;
        this.comment = comment;
        this.duration = duration;
    }
}