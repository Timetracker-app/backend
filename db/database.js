const mysql = require("mysql2");

const connectDB = () => {
  let conn;
  try {
    // Create a new connection
    conn = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    // Print success
    console.log("Connected with database!");
  } catch (err) {
    // Print error
    console.log(err);
  }
};

module.exports = connectDB;
