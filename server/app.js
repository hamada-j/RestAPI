const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

const app = express();

mongoose.connect(
  "mongodb+srv://" +
    process.env.my +
    ":" +
    process.env.pass +
    "@cluster0-ghxig.mongodb.net/test?retryWrites=true&w=majority"
);
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authoritation"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found, I creat this message");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  });
});
module.exports = app;
