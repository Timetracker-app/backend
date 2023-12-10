import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

async function dbConnect() {
  let conn;
  try {
    // Create a new connection
    conn = await mysql.createConnection({
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
}

//dbConnect();
