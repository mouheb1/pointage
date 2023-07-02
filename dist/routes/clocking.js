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
var Clocking_1 = require("../models/Clocking");
var Clocking_2 = require("../services/Clocking");
var moment_1 = __importDefault(require("moment"));
var uuid_1 = require("uuid");
var Employee_1 = require("../services/Employee");
var router = (0, express_1.Router)();
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
router.post('/check-in', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee_id, employee, lastClocking, clocking, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    employee_id = req.body.employee_id;
                    return [4 /*yield*/, Employee_1.employeeService.getEmployeeById(employee_id)];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        throw new Error('Employee ID doesn\'t exist');
                    }
                    return [4 /*yield*/, Clocking_2.clockingService.getLastClocking(employee_id, (0, moment_1.default)().format('YYYY-MM-DD'))];
                case 2:
                    lastClocking = _a.sent();
                    if (lastClocking && lastClocking.check_in && !lastClocking.check_out) {
                        throw new Error('you need to check_out first');
                    }
                    return [4 /*yield*/, Clocking_2.clockingService.createClocking(Object.assign(new Clocking_1.Clocking(__assign(__assign({}, req.body), { id: (0, uuid_1.v4)(), check_in: (0, moment_1.default)().format('YYYY-MM-DDTHH:mm:ss') }))))];
                case 3:
                    clocking = _a.sent();
                    return [2 /*return*/, res.status(201).json({ clocking: clocking })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, res.status(400).send(error_1.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
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
router.post('/check-out', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee_id, employee, lastClocking, newCheckOut, check_in, check_out, duration, hours, minutes, seconds, clocking, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    employee_id = req.body.employee_id;
                    return [4 /*yield*/, Employee_1.employeeService.getEmployeeById(employee_id)];
                case 1:
                    employee = _a.sent();
                    if (!employee) {
                        throw new Error('Employee ID doesn\'t exist');
                    }
                    return [4 /*yield*/, Clocking_2.clockingService.getLastClocking(employee_id, (0, moment_1.default)().format('YYYY-MM-DD'))];
                case 2:
                    lastClocking = _a.sent();
                    if (!lastClocking || lastClocking && lastClocking.check_out) {
                        throw new Error('you need to check_in first');
                    }
                    newCheckOut = (0, moment_1.default)().format('YYYY-MM-DDTHH:mm:ss');
                    check_in = (0, moment_1.default)(lastClocking.check_in);
                    check_out = (0, moment_1.default)(newCheckOut);
                    duration = moment_1.default.duration(check_out.diff(check_in));
                    hours = Math.floor(duration.asHours());
                    minutes = duration.minutes();
                    seconds = duration.seconds();
                    return [4 /*yield*/, Clocking_2.clockingService.updateClockingCheckOut(__assign(__assign(__assign({}, lastClocking), req.body), { check_out: newCheckOut, duration: "".concat(hours, "h ").concat(minutes, "m ").concat(seconds, "s") }))];
                case 3:
                    clocking = _a.sent();
                    return [2 /*return*/, res.status(201).json({ clocking: clocking })];
                case 4:
                    error_2 = _a.sent();
                    return [2 /*return*/, res.status(400).send(error_2.message)];
                case 5: return [2 /*return*/];
            }
        });
    });
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
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee_id, clockings, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    employee_id = req.body.employee_id;
                    if (!employee_id) {
                        throw new Error('Employee ID is required');
                    }
                    return [4 /*yield*/, Clocking_2.clockingService.getClockings(employee_id)];
                case 1:
                    clockings = _a.sent();
                    return [2 /*return*/, res.status(200).json({ clockings: clockings })];
                case 2:
                    error_3 = _a.sent();
                    return [2 /*return*/, res.status(400).send(error_3.message)];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.default = router;
