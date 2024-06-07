require("dotenv").config();
const connectDB = require("../db/connection").pool;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
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
            "SELECT ime, priimek, email, geslo, role FROM delavec WHERE email = ?",
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

      const token = jwt.sign(
        { userName: output[0].ime, role: output[0].role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
      );

      res.status(200).json({ user: output[0].ime, token });
    } catch (error) {
      console.log("Error login");
    }
  } else {
    res.status(400).json("Bad request");
  }
};
module.exports = login;
