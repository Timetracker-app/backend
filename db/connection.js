//import mysql from "mysql2";
//import dotenv from "dotenv";
const mysql = require("mysql2");

const dotenv = require("dotenv");

dotenv.config();

const conn = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "@&Q!GeKA7pTS",
  database: "timetracker",
  connectionLimit: 15,
});

/*
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: 15,
  })  .promise();
*/

exports.pool = conn;
