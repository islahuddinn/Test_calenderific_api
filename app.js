const express = require("express");
const AppError = require("./Utils/appError");
const globalErrorHandler = require("./Controllers/errorController");
// const fs = require("fs");
// const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
// const path = require("path");
const setupRoutesV1 = require("./Routes/routes");

const app = express();

//----------- GLOBAL MIDDLEWARES ---------/////

//set security http headers
app.use(helmet());
///// Development logging
app.use(express.json()); //Body parser for JSON data
app.use(express.urlencoded({ extended: true }));
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(xss());

// app.use((req, res, next) => {
//   console.log("Hey, from middleware");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  console.log(req.headers);
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.status(200).render("base");
});
app.use("/api/v1", setupRoutesV1());
// app.use("/privacy", privacyRoutes);
// app.use("/termsandcondition", termsandconditionRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
