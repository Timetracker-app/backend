const connectDB = require("../db/connection").pool;

const checkName = require("./checker");

const getAllWorkers = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
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
      console.log("Can not connect to database");
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
  console.log(data);
  if (data.name && data.lastname && data.email && data.password) {
    const freeName = await checkName(data.name);
    if (freeName) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Can not connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "INSERT INTO delavec (ime, priimek, email, geslo) VALUES (?, ?, ?, ?)",
          [data.name, data.lastname, data.email, data.password],
          (err, result) => {
            if (err) {
              console.log("Server error");
              res.status(500);
              throw err;
            }
            res.status(201).json({ data });

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
      res.status(404).json("Igralec že obstaja");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const deleteWorker = async (req, res) => {
  const { ime: name } = req.params;

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
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
        if (result.affectedRows === 0) {
          res.status(404).json("Not found");
        } else {
          console.log(result);
          res.status(204).json({ result });

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

const updateWorker = async (req, res) => {
  const data = {
    lastname: req.body.priimek,
    email: req.body.email,
    password: req.body.geslo,
  };
  const { ime: name } = req.params;
  console.log(data);
  if (name && data.lastname && data.email && data.password) {
    const freeName = await checkName(name);
    if (!freeName) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Can not connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "UPDATE delavec SET priimek = ?, email = ?, geslo= ? WHERE ime = ?",
          [data.lastname, data.email, data.password, name],
          (err, result) => {
            if (err) {
              console.log("Server error");
              res.status(500);
              throw err;
            }
            res.status(204).json({ data });

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
      res.status(404).json("Igralec ne obstaja");
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
