"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
var database_1 = __importDefault(require("../config/database"));
var EmployeeService = /** @class */ (function () {
    function EmployeeService() {
    }
    EmployeeService.prototype.createEmployee = function (employee) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, database_1.default)()];
                    case 1:
                        db = _a.sent();
                        // Insert the employee into the "employees" table
                        return [4 /*yield*/, db.run('INSERT INTO employees (id, name, firstName, dateCreated, department) VALUES (?, ?, ?, ?, ?)', [
                                employee.id,
                                employee.name,
                                employee.firstName,
                                employee.dateCreated,
                                employee.department,
                            ])];
                    case 2:
                        // Insert the employee into the "employees" table
                        _a.sent();
                        return [2 /*return*/, employee];
                }
            });
        });
    };
    EmployeeService.prototype.getEmployees = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var db, query, employees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, database_1.default)()];
                    case 1:
                        db = _a.sent();
                        query = 'SELECT * FROM employees';
                        // Add condition if date is provided
                        if (date) {
                            query += ' WHERE dateCreated = ?';
                        }
                        return [4 /*yield*/, db.all(query, date ? [date] : [])];
                    case 2:
                        employees = _a.sent();
                        return [2 /*return*/, employees];
                }
            });
        });
    };
    EmployeeService.prototype.getEmployeeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var db, employee;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, database_1.default)()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get('SELECT * FROM employees WHERE id = ?', id ? [id] : [])];
                    case 2:
                        employee = _a.sent();
                        return [2 /*return*/, employee];
                }
            });
        });
    };
    return EmployeeService;
}());
exports.employeeService = new EmployeeService;
