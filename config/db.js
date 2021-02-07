const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection error : " + err.stack);
    return;
  }
});

module.exports = connection;
