const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hbs = require("express-hbs");
const cors = require("cors");

const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const clientRouter = require("./routes/client");

const app = express();

require("./db").connect();
db.query("select * from products", (err, rows) => {
  console.log(err);
  console.table(rows);
});

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.my +
      ":" +
      process.env.pass +
      "@cluster0-ghxig.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connect to MongoDB-Atlas");
  })
  .catch(() => {
    console.log("Desconecct from MongoDB-Atlas");
  });
mongoose.Promise = global.Promise;

app.use(logger("dev"));

app.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views/"
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/images", express.static("images"));
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

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/client", clientRouter);

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
