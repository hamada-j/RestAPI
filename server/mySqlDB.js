require("dotenv").config();
const mysql = require("mysql");
// var pool = null;
exports.connect = () => {
  const pool = mysql.createPool({
    host: "bfaf7mhgdl9m9dedaylg-mysql.services.clever-cloud.com",
    user: "uzais6l5dqjanitp",
    password: "qQ8cCsvnWw8XFKuVUtgM",
    port: 3306,
    database: "bfaf7mhgdl9m9dedaylg",
  });
  global.db = pool;
};
