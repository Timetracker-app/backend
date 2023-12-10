const connectDB = require("../db/connection").pool;

const getAllWorkplaces = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    connection.query(
      "SELECT stroj, cas, status FROM delovno_mesto",
      (err, result) => {
        if (err) throw err; // KASN ERROR JE V TEM PRIMERU?

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
      console.log("Can not connect to database");
      throw err;
    }
    connection.query(
      "SELECT stroj, cas, status FROM delovno_mesto WHERE stroj = ?",
      [workplaceID],
      (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
          res.status(404).json("Not found");
        } else {
          console.log("Connection established");
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
  getAllWorkplaces,
  getWorkplace,
};
