const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const hbs = require("express-hbs");
const cors = require("cors");
const moment = require("moment");
const indexRouter = require("./routes/index");
/** ==========================================
 
                  ROUTING
 
==========================================**/
const apiRouter = require("./routes/api");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const clientRouter = require("./routes/client");
const postsRouter = require("./routes/posts");
const adminRouter = require("./routes/admin");
//////////////////NO TOUCH/////////////////////
const app = express();
/** ==========================================

            DATA BASE:
          -MySQL - LOCAL
          -MONGO DB - ATLAS
 
==========================================**/
require("./mySqlDB").connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connect to MySql");
});
require("./mongoDB");
mongoose.Promise = global.Promise;
/** ==========================================

            VIES ENGINE:
             Handlebars
          
==========================================**/
app.use(logger("dev"));
app.engine(
  "hbs",
  hbs.express4({
    defaultLayout: __dirname + "/views/layouts/layout",
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
/** ==========================================

       PARSING---PUBLIC---SESSION---FLASH       
          
==========================================**/
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "This is my logng string for sessions http",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
/** ==========================================

              HEADERS --- CORS      
          
==========================================**/
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authoritation"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
/** ==========================================

                ALL ROUTES    
          
==========================================**/
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/client", clientRouter);
app.use("/api/posts", postsRouter);
app.use("/admin", adminRouter);
/** ==========================================

              GENERAL & ERRORS      
          
==========================================**/
app.use((req, res, next) => {
  const error = new Error("Not Found, I creat this message");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});
module.exports = app;
