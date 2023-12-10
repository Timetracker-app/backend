const connectDB = require("../db/connection").pool;

const getAllWorks = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    connection.query(
      "SELECT IDdela, ime, projekt, stroj, zacetni_cas, koncni_cas FROM delo",
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

const getWork = async (req, res) => {
  const { IDdela: workID } = req.params;

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    connection.query(
      "SELECT IDdela, ime, projekt, stroj, zacetni_cas, koncni_cas FROM delo WHERE IDdela = ?",
      [workID],
      (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
          res.status(404).json("Not found");
        } else {
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
      }
    );
  });
};
module.exports = {
  getAllWorks,
  getWork,
};
