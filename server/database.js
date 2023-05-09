const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "eder",
});
conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("MYsql is successfully connected");
  }
});

module.exports = conn;
