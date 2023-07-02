import createError from "http-errors";
import express from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import './config'

import employeeRouter from "./routes/employee";
import clockingRouter from "./routes/clocking";

export const app = express();

// Swagger configuration options
const swaggerOptions = {
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

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/employee", employeeRouter);
app.use("/clocking", clockingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  //console.info(`PORT: ${PORT}`);
});

// Close the server gracefully when Jest is done running the tests
if (process.env.NODE_ENV === 'test') {
  afterAll((done) => {
    server.close(done);
  });
}