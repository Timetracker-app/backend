const connectDB = require("../db/connection").pool;
const bcrypt = require("bcryptjs");

const checkName = require("./checker").checkName;
const checkEmail = require("./checker").checkEmail;

const getAllWorkers = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database");
      throw err;
    }
    console.log("Connection established");
    connection.query(
      "SELECT ime, priimek, email FROM delavec",
      (err, result) => {
        if (err) {
          console.log("Server error");
          res.status(500);
          throw err;
        }
        console.log(result);
        res.status(200).json({ result });

        connection.release();
        if (err) {
          console.log("Can not release connection to database");
          throw err;
        }
        console.log("Connection released.");
      }
    );
  });
};

const getWorker = async (req, res) => {
  const { ime: name } = req.params;

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database");
      throw err;
    }
    console.log("Connection established");
    connection.query(
      "SELECT ime, priimek, email FROM delavec WHERE ime = ?",
      [name],
      (err, result) => {
        if (err) {
          console.log("Server error");
          res.status(500);
          throw err;
        }

        if (result.length === 0) {
          res.status(404).json("Not found");
        } else {
          console.log(result);
          res.status(200).json({ result });

          connection.release();
          if (err) {
            console.log("Can not release connection to database");
            throw err;
          }
          console.log("Connection released.");
        }
      }
    );
  });
};

const addWorker = async (req, res) => {
  const data = {
    name: req.body.ime,
    lastname: req.body.priimek,
    email: req.body.email,
    password: req.body.geslo,
  };
  if (data.name && data.lastname && data.email && data.password) {
    const freeName = await checkName(data.name);
    const freeEmail = await checkEmail(data.email);
    if (freeName.length === 0) {
      if (freeEmail.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(data.password, salt);

        connectDB.getConnection((err, connection) => {
          if (err) {
            console.log("Cannot connect to database");
            throw err;
          }
          console.log("Connection established");
          connection.query(
            "INSERT INTO delavec (ime, priimek, email, geslo) VALUES (?, ?, ?, ?)",
            [data.name, data.lastname, data.email, hashedPass],
            (err, result) => {
              if (err) {
                console.log("Server error");
                res.status(500);
                throw err;
              }
              res.status(201).json("User " + data.name + " added");

              connection.release();
              if (err) {
                console.log("Can not release connection to database");
                throw err;
              }
              console.log("Connection released.");
            }
          );
        });
      } else {
        res.status(409).json("Email already exists!");
      }
    } else {
      res.status(409).json("Worker already exists!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const deleteWorker = async (req, res) => {
  const { ime: name } = req.params;

  if (name) {
    const freeName = await checkName(name);
    if (freeName.length !== 0) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "DELETE FROM delavec WHERE ime = ?",
          [name],
          (err, result) => {
            if (err) {
              console.log("Server error: ", err);
              res.status(500);
            }
            console.log(result);

            res.status(204).json("Worker " + name + " deleted!");

            connection.release();
            if (err) {
              console.log("Can not release connection to database");
              throw err;
            }
            console.log("Connection released.");
          }
        );
      });
    } else {
      res.status(404).json("Worker does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const updateWorker = async (req, res) => {
  const data = {
    lastname: req.body.priimek,
    email: req.body.email,
    password: req.body.geslo,
  };
  const { ime: name } = req.params;

  if (name && data.lastname && data.email && data.password) {
    const freeName = await checkName(name);
    const freeEmail = await checkEmail(data.email);

    if (freeName.length !== 0) {
      if (
        freeEmail.length === 0 ||
        freeEmail[0].email !== data.email ||
        freeName[0].email === data.email
      ) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(data.password, salt);

        connectDB.getConnection((err, connection) => {
          if (err) {
            console.log("Cannot connect to database");
            throw err;
          }
          console.log("Connection established");
          connection.query(
            "UPDATE delavec SET priimek = ?, email = ?, geslo= ? WHERE ime = ?",
            [data.lastname, data.email, hashedPass, name],
            (err, result) => {
              if (err) {
                console.log("Server error");
                res.status(500);
                throw err;
              }
              res.status(204).json("Worker " + name + " updated!");

              connection.release();
              if (err) {
                console.log("Can not release connection to database");
                throw err;
              }
              console.log("Connection released.");
            }
          );
        });
      } else {
        res.status(409).json("Email already exists!");
      }
    } else {
      res.status(404).json("Worker does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

module.exports = {
  getAllWorkers,
  getWorker,
  addWorker,
  deleteWorker,
  updateWorker,
};
