require("dotenv").config();
const connectDB = require("../db/connection").pool;
const bcrypt = require("bcryptjs");

const checkPassword = async (req, res, next) => {
  const data = {
    password: req.body.geslo,
  };
  const { ime: name } = req.params;

  if (name && data.password) {
    try {
      const output = await new Promise((resolve, reject) => {
        connectDB.getConnection((err, connection) => {
          if (err) {
            console.log("Cannot connect to database");
            throw err;
          }
          console.log("Connection established");
          connection.query(
            "SELECT geslo FROM delavec WHERE ime = ?",
            [name],
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

      if (output.length !== 0) {
        const isMatch = await bcrypt.compare(data.password, output[0].geslo);
        if (isMatch) {
          console.log("Passwords match!");
          next();
        } else {
          console.log("Invalid Credentials");
          res.status(401).json("Invalid Credentials");
        }
      }
    } catch (error) {
      console.log("Error password checker");
      console.log(error);
    }
  } else {
    res.status(400).json("Bad request");
  }
};
module.exports = checkPassword;
