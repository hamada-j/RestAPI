const mysql = require("mysql");
// var pool = null;
exports.connect = () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "root",
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
  });
  global.db = pool;
};
exports.get = function() {
  return pool;
};
