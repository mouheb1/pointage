"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clocking = void 0;
var Clocking = /** @class */ (function () {
    function Clocking(input) {
        var id = input.id, employee_id = input.employee_id, check_out = input.check_out, check_in = input.check_in, comment = input.comment, duration = input.duration;
        this.id = id;
        this.employee_id = employee_id;
        this.check_in = check_in;
        this.check_out = check_out;
        this.comment = comment;
        this.duration = duration;
    }
    return Clocking;
}());
exports.Clocking = Clocking;
