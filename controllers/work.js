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

const getWorks = async (req, res) => {
  const data = {
    workID: req.body.IDdela,
    worker: req.body.ime,
    project: req.body.projekt,
    workplace: req.body.stroj,
    start_time: req.body.zacetni_cas,
    end_time: req.body.koncni_cas,
  };

  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Cannot connect to database");
      throw err;
    }
    connection.query(
      "SELECT * FROM work WHERE (ime = 'worker' OR 'worker' = '') AND (projekt = 'project' OR 'project' = '') AND (stroj = 'workplace' OR 'workplace' = '') AND (zacetni_cas >= 'start_time' OR 'start_time' = '') AND (koncni_cas <= 'end_time' OR 'end_time' = '');",
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
  getWorks,
};
