const mysql = require("mysql2");

const dbconnection = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11479399",
  password: "EutTrrcdhx",
  database: "sql11479399",
  port: 3306,
});

module.exports = dbconnection;
