"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
var Employee = /** @class */ (function () {
    function Employee(input) {
        var id = input.id, name = input.name, firstName = input.firstName, dateCreated = input.dateCreated, department = input.department;
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.dateCreated = dateCreated;
        this.department = department;
    }
    return Employee;
}());
exports.Employee = Employee;
