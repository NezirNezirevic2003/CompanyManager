const mysql = require("mysql2");

const dbconnection = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11477389",
  password: "HdxbUpIT2n",
  database: "sql11477389",
  port: 3306,
});

module.exports = dbconnection;
