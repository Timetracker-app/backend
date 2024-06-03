require("dotenv").config();
const connectDB = require("../db/connection").pool;
const bcrypt = require("bcryptjs");

const checkPassword = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.geslo,
  };
  if (data.email && data.password) {
    try {
      const output = await new Promise((resolve, reject) => {
        connectDB.getConnection((err, connection) => {
          if (err) {
            console.log("Cannot connect to database");
            throw err;
          }
          console.log("Connection established");
          connection.query(
            "SELECT ime, priimek, email, geslo FROM delavec WHERE email = ?",
            [data.email],
            (err, result) => {
              if (err) {
                console.log("Server error");
                res.status(500);
                reject(err);
              }
              connection.release();
              if (err) {
                console.log("Can not release connection to database");
                reject(err);
              }
              console.log("Connection released.");
              resolve(result);
            }
          );
        });
      });

      if (output.length === 0) {
        res.status(401).json("Invalid Credentials");
      }
      const isMatch = await bcrypt.compare(data.password, output[0].geslo);
      if (!isMatch) {
        res.status(401).json("Invalid Credentials");
      }
      console.log("Passwords match!");

      next();
    } catch (error) {
      console.log("Error login");
    }
  } else {
    res.status(400).json("Bad request");
  }
};
module.exports = checkPassword;
