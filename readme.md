### BackEnd Side PROJECT >>>fork<<<

This is the final project of the Bootcam in NeoLand, by Hamada.
This part represents the BackEnd of the application, which will have two connections to: a relational database (SQL) MySQL and another non-relational one (noSQL) MongoDB-Atlas. And a render in the BackEnd-NodeJS with Hadlebars(HBS) a view for the administrator.

### Repository and History

- 1º Branch develop-> in GitHub from GitHub Desktop (https://github.com/hamada-j/), global company that provides hosting for software development version control using Git.
- 2º Branch test-> in Circleci-Project(CircleCI build in https://app.circleci.com/pipelines/github/hamada-j/RestAPI) Docker Medium 2 CPU / 4 GB RAM(https://hub.docker.com/repository/docker/sh2020/hamada-j) every code change triggers automated tests in a clean container or VM. CircleCI then sends an email notification of success or failure after the tests complete.
- 3º Branch master-> in Heroku-Master from Git (https://shrestapi.herokuapp.com/) is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

## REST-API

REST-API are Statless Backends

- REST: Respresentational State Transfer ( we can use to transfer data )
- Req -- to --> Server
- Res <-- from -- Server
  Stores and Fetches Data { JSON and BSON} but doesn`t use/render HTML, NodeJS with Hadlebars(.hbs)
- URL and Methods

## Admin

### /admin(id) : GET, POST, PATCH, DELETE

### /product(id) : GET, POST, PATCH, DELETE

### /order(id) : GET, POST, PATCH, DELETE

### /users(id) : GET, POST, PATCH, DELETE

### /region(id) : GET, POST, PATCH, DELETE

### /territorie(id) : GET, POST, PATCH, DELETE

### /supplier(id) : GET, POST, PATCH, DELETE

## Employee

### /product(id) : GET, PATCH

### /order(id) : GET, POST, PATCH, DELETE

### /users(id) : GET, POST, PATCH, DELETE

### /client(id) : GET, POST, PATCH, DELETE

## Client

### /product(id) : GET

### /order(id) : GET, POST, PATCH, DELETE

### /users(id) : GET

### First Steps

1º`$ mkdir RestAPI`
---> Install Node.js®. Node is a JavaScript runtime built on Chrome's(C+) V8 JavaScript engine. ( https://nodejs.org/ )

2º`$ npm init`
---> NPM is the company behind Node package manager, the npm Registry, and npm CLI ( https://www.npmjs.com/ )

3º `% npm install -- express`
---> Express is a minimal and flexible Node.js web application framework ( https://expressjs.com/ )

### Creat a basic server with EXPRESS server and Handlebars views

Handlebars provides necessary to let you build semantic templates effectively with no frustration. ( https://handlebarsjs.com/ )
`$ express --view = hbs restapi`

### Generate a first routes

creat in route folder

```javascript
const router = express.Router();
// get Method
router.get("/", function(req, res, next) {
  res.send("from products url");
});
module.exports = router;
```

expot to app.js

```javascript
const productsRouter = require("./routes/products");
```

run

```javascript
app.use("/products", productsRouter
```

```javascript
router.get("/:productId", function(req, res, next) {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "you GET SPECIAL products",
      id: id
    });
  } else {
    res.status(200).json({
      message: "you passed an ID"
    });
  }
});
```

### ADD SOME CONTROL ERRORS SERVER

in app.js

```javascript
app.use((req, res, next) => {
  const error = new Error("Not Found, I creat this message of Errors");
  error.status = 404;
  next(error);
});
```

### ADD BODYPARSER AND TEST IN POSTMAN

Postman is a collaboration platform for API development. Postman's features simplify each step of building an API and streamline collaboration so you can create better APIs—faster.
install ( https://www.postman.com/ )

`$ npm install --save body-parser`
Method parses a JSON string (https://www.npmjs.com/package/body-parser)

in app.js

```javascript
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

and in products or orders

```javascript
router.post("/", function(req, res, next) {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "posted a order correctly",
    createdOrder: order
  });
});
```

### CORS: Security Concept /// right HEADERS ///

client(localhost:3000) <------ that is fine ------> server(localhost3000)

client(localhost:3000) <------- CORS -------> server(localhost4000)

Where '\*' it is the value (and can be IP or specific web ...)

in app.js

```javascript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
});
```

### DATABASE: MONGO DB - ATLAS /// with mongoose package ///

MongoDB is a document database (noSQL), which means it stores data in JSON-like documents.(https://www.mongodb.com/). Atlas is Best-in-class automation and proven practices guarantee availability, scalability, and compliance with the most demanding data security and privacy standards.

- Create and Connect to Cluster0 in Mongo-Atlas
- install mongoose: `$ npm install --save mongoose`
  Mongoose provides a straight-forward, schema-based solution to model your application data.( https://mongoosejs.com/ )

- new file mongoDB.js

```javascript
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.my +
      ":" +
      process.env.pass +
      "@cluster0-ghxig.mongodb.net/test?retryWrites=true&w=majority",
```

- Add Nodemone. Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. ( https://nodemon.io )
  And in new file nodemon.json env keys 'process.env':

```javascript
{
  "env": {
    "my": "Secret",
    "pass": "OtherSecret",
    "jwt_key": "Somthing"
  }
}
```

### DATABASE: MySql /// with mysql package ///

MySQL is an open-source relational database management system (RDBMS) by Oracle.( https://www.mysql.com/ )

- Run in localy in the host 127.0.0.1 from port 8889
- Add Dotenv is a zero-dependency module that loads environment variables from a .env file into 'process.env'.
  `$ npm i dotenv`

### ADD PHOTO /// with multer package ///

- add photo to product with Multer. Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. (https://www.npmjs.com/package/multer)
- install multer: `$ npm install --save multer`
- in app.js added

### AUTHENTICATION

CLIENT<---->token<----->SERVER (RESTful API)

verification en both side of is verification valid to make a strict connection. JSON web Token(json data + signature ===> JWT ) Not Encripted

- BCRYPT from `npm install --save bcrypt` for "hash" the password of client.
  (https://www.npmjs.com/package/bcrypt)
- JWT from `npm install jsonwebtoken --save` for "token" sesion.
  (https://jwt.io/)
- CORS from `npm install cors --save` for "cors" sesion.

### AUTHENTICATION

### Fix later

Token
`$ npm install jwt`

`$ npm install bycrpt`

moment
`$ npm install moment`

cookie
`$ npm install cookie-parser`
npm install jwt-simple

message
`npm install --save express-flash`
`npm install --save express-session`

flash-messages No funciona
`$ npm install express-flash-messages`

```javascript
app.use(
  session({
    secret: "This is my logng string for sessions http",
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());
```

code in login.hs

`$ npm i morris-js-module`
`bcryptjs` login users
`express validator`login users
