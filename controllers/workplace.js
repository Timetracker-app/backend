const connectDB = require("../db/connection").pool;

const checkWorkplace = require("./checker").checkWorkplace;

const prepareResponse = require("./tools").prepareResponse;

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

  const userRole = req.user.role;

  if (userRole === "admin") {
    if (workplaceID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Can not connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "SELECT * FROM delovno_mesto WHERE stroj = ?",
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
    }
  } else {
    console.log("Forbidden");
    res.status(403).json("Forbidden");
  }
};

const addWorkplace = async (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  const data = {
    workplaceID: req.body.stroj,
    status: req.body.status,
  };
  console.log(data);
  const userRole = req.user.role;

  if (userRole === "admin") {
    if (data.workplaceID) {
      if (data.workplaceID && (data.status === 0 || data.status === 1)) {
        const freeID = await checkWorkplace(data.workplaceID);
        if (freeID.length === 0) {
          connectDB.getConnection((err, connection) => {
            if (err) {
              console.log("Cannot connect to database");
              throw err;
            }
            console.log("Connection established");
            connection.query(
              "INSERT INTO delovno_mesto (stroj, status) VALUES (?,?)",
              [data.workplaceID, data.status],
              (err, result) => {
                if (err) {
                  console.log("Server error");
                  res.status(500);
                  throw err;
                }
                res
                  .status(201)
                  .json("Workplace " + data.workplaceID + " added!");

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
          const errorMsg = prepareResponse("Workplace ID already exists!", 104);
          res.status(409).json({ errorMsg });
        }
      } else {
        res.status(400).json("Bad request");
      }
    }
  } else {
    console.log("Forbidden");
    res.status(403).json("Forbidden");
  }
};

const updateWorkplace = async (req, res) => {
  const data = {
    status: req.body.status,
    time: req.body.cas,
  };
  const { stroj: workplaceID } = req.params;
  console.log(workplaceID, data);
  const userRole = req.user.role;

  if (userRole === "admin") {
    if (
      workplaceID &&
      (data.status === 0 || data.status === 1) &&
      data.time !== ""
    ) {
      const freeID = await checkWorkplace(workplaceID);
      if (freeID.length !== 0) {
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
              res.status(204).json("Workplace " + workplaceID + " updated!");

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
        const errorMsg = prepareResponse("Workplace does not exist!", 105);
        res.status(404).json({ errorMsg });
      }
    } else {
      res.status(400).json("Bad request");
    }
  } else {
    console.log("Forbidden");
    res.status(403).json("Forbidden");
  }
};

const deleteWorkplace = async (req, res) => {
  const { stroj: workplaceID } = req.params;

  const userRole = req.user.role;

  if (userRole === "admin") {
    if (workplaceID) {
      const freeID = await checkWorkplace(workplaceID);
      if (freeID.length !== 0) {
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

              res.status(204).json("Workplace " + workplaceID + " deleted!");

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
        const errorMsg = prepareResponse("Workplace does not exist!", 105);
        res.status(404).json({ errorMsg });
      }
    } else {
      res.status(400).json("Bad request");
    }
  } else {
    console.log("Forbidden");
    res.status(403).json("Forbidden");
  }
};

module.exports = {
  getAllWorkplaces,
  getWorkplace,
  addWorkplace,
  updateWorkplace,
  deleteWorkplace,
};
