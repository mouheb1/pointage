"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = require("express");
var Employee_1 = require("../models/Employee");
var Employee_2 = require("../services/Employee");
var uuid_1 = require("uuid");
var moment_1 = __importDefault(require("moment"));
var router = (0, express_1.Router)();
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
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Employee_2.employeeService.createEmployee(Object.assign(new Employee_1.Employee(__assign(__assign({}, req.body), { id: (0, uuid_1.v4)(), dateCreated: (0, moment_1.default)().format('YYYY-MM-DDTHH:mm:ss') }))))];
                case 1:
                    employee = _a.sent();
                    return [2 /*return*/, res.status(201).json({ employee: employee })];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.send(error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
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
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var date, employees, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    date = req.body.date && (0, moment_1.default)(req.body.date).format('YYYY-MM-DD');
                    return [4 /*yield*/, Employee_2.employeeService.getEmployees(date)];
                case 1:
                    employees = _a.sent();
                    return [2 /*return*/, res.status(200).json({ employees: employees })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.send(error_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
