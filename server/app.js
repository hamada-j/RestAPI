const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hbs = require("express-hbs");
const cors = require("cors");

const indexRouter = require("./routes/index");
//// mySql router  ////
const apiRouter = require("./routes/api");
//// Atlas router ////
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const clientRouter = require("./routes/client");

//// the App ////
const app = express();

//// MySql Connection ////
require("./mySqlDB").connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connect to MySql");
});
db.query("select * from customers", (err, rows) => {
  console.log(err);
  console.table(rows);
});

//// mongoAtlas Connection ////
require("./mongoDB");
mongoose.Promise = global.Promise;

//// Views Handlebar ////
app.use(logger("dev"));
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views/"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

//// Parsing Data ////
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use("/images", express.static("images"));

//// CORS & Headers ////
app.use(cors());
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

//// Router ////
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/client", clientRouter);

//// Catch Errors Server (General) ////
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
