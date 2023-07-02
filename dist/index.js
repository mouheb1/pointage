"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./config");
var employee_1 = __importDefault(require("./routes/employee"));
var clocking_1 = __importDefault(require("./routes/clocking"));
exports.app = (0, express_1.default)();
// Swagger configuration options
var swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for your Express API',
        },
    },
    apis: ['./routes/*.ts'], // Replace with the path to your route files
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
// Serve Swagger API documentation
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
exports.app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
// view engine setup
exports.app.set("views", path_1.default.join(__dirname, "views"));
exports.app.set("view engine", "jade");
// app.use(logger("dev"));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
exports.app.use("/employee", employee_1.default);
exports.app.use("/clocking", clocking_1.default);
// catch 404 and forward to error handler
exports.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
exports.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
var PORT = process.env.PORT;
var server = exports.app.listen(PORT, function () {
    //console.info(`PORT: ${PORT}`);
});
// Close the server gracefully when Jest is done running the tests
if (process.env.NODE_ENV === 'test') {
    afterAll(function (done) {
        server.close(done);
    });
}
