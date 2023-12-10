const connectDB = require("../db/connection").pool;

const getAllProjects = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    console.log("Connection established");
    connection.query(
      "SELECT projekt, cas, status FROM narocilo",
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

const getProject = async (req, res) => {
  const { projekt: projectID } = req.params;

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    console.log("Connection established");
    connection.query(
      "SELECT projekt, cas, status FROM narocilo WHERE projekt = ?",
      [projectID],
      (err, result) => {
        if (err) {
          console.log("Server error");
          res.status(500);
          throw err;
        }

        if (result.length === 0) {
          res.status(404).json("Not found");
        } else {
          console.log(result.type);
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
module.exports = {
  getAllProjects,
  getProject,
};
