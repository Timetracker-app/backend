const connectDB = require("../db/connection").pool;

const checkWorkplaceID = require("./checker").checkWorkplaceID;

const getAllWorkplaces = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    connection.query(
      "SELECT stroj, cas, status FROM delovno_mesto",
      (err, result) => {
        if (err) {
          console.log("Server error");
          res.status(500);
          throw err;
        }
        console.log("Connection established");
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

const getWorkplace = async (req, res) => {
  const { stroj: workplaceID } = req.params;

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database");
      throw err;
    }
    connection.query(
      "SELECT stroj, cas, status FROM delovno_mesto WHERE stroj = ?",
      [workplaceID],
      (err, result) => {
        if (err) {
          console.log("Server error");
          res.status(500);
          throw err;
        }

        if (result.length === 0) {
          res.status(404).json("Not found");
        } else {
          console.log("Connection established");
          console.log(result);
          res.status(200).json({ result });

          connection.release();
          if (err) {
            console.log("Cannot release connection to database");
            throw err;
          }
          console.log("Connection released.");
        }
      }
    );
  });
};

const addWorkplace = async (req, res) => {
  const data = {
    workplaceID: req.body.stroj,
  };
  console.log(data);
  if (data.workplaceID) {
    const freeID = await checkWorkplaceID(data.workplaceID);
    if (freeID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "INSERT INTO delovno_mesto (stroj) VALUES (?)",
          [data.workplaceID],
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
      res.status(409).json("Workplace ID already exists!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const updateWorkplace = async (req, res) => {
  const data = {
    status: req.body.status,
    time: req.body.cas,
  };
  const { stroj: workplaceID } = req.params;
  console.log(workplaceID, data);
  if (
    workplaceID !== "" &&
    (data.status === 0 || data.status === 1) &&
    data.time !== ""
  ) {
    const freeID = await checkWorkplaceID(workplaceID);
    if (!freeID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "UPDATE delovno_mesto SET status = ?, cas = ? WHERE stroj = ?",
          [data.status, data.time, workplaceID],
          (err, result) => {
            if (err) {
              console.log("Server error");
              res.status(500);
              throw err;
            }
            res.status(204).json({ data });

            connection.release();
            if (err) {
              console.log("Cannot release connection to database");
              throw err;
            }
            console.log("Connection released.");
          }
        );
      });
    } else {
      res.status(404).json("Workplace does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const deleteWorkplace = async (req, res) => {
  const { stroj: workplaceID } = req.params;

  if (workplaceID) {
    const freeID = await checkWorkplaceID(workplaceID);
    if (!freeID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "DELETE FROM delovno_mesto WHERE stroj = ?",
          [workplaceID],
          (err, result) => {
            if (err) {
              console.log("Server error: ", err);
              res.status(500);
            }
            console.log(result);

            res.status(204).json({ result });

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
      res.status(404).json("Workplace does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

module.exports = {
  getAllWorkplaces,
  getWorkplace,
  addWorkplace,
  updateWorkplace,
  deleteWorkplace,
};
