const connectDB = require("../db/connection").pool;

const generateURL = require("./tools").generateURL;

/*
const getAllWorks = async (req, res) => {
  connectDB.getConnection((err, connection) => {
    if (err) {
      console.log("Can not connect to database");
      throw err;
    }
    connection.query("SELECT * FROM delo", (err, result) => {
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
    });
  });
};
*/
const getWorks = async (req, res) => {
  /*
  const data = {
    worker: req.query.ime,
    project: req.query.projekt,
    workplace: req.query.stroj,
    start_time: req.query.zacetnicas,
    end_time: req.query.koncnicas,
  };
  */
  const worker = req.query.worker;
  const project = req.query.project;
  const workplace = req.query.workplace;
  const starttime = req.query.starttime;
  const endtime = req.query.endtime;
  /*
  if (
    typeof data.worker === "string" &&
    typeof data.project === "string" &&
    typeof data.workplace === "string" &&
    typeof data.start_time === "string" &&
    typeof data.end_time === "string"
  ) {*/
  if (
    typeof worker === "string" &&
    typeof project === "string" &&
    typeof workplace === "string" &&
    typeof starttime === "string" &&
    typeof endtime === "string"
  ) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        throw err;
      }
      connection.query(
        "SELECT * FROM delo WHERE (ime = ? OR ? = '') AND (projekt = ? OR ? = '') AND (stroj = ? OR ? = '') AND (zacetni_cas >= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s') OR ? = '') AND (zacetni_cas <= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s') OR ? = '');",
        /*[
          data.worker,
          data.worker,
          data.project,
          data.project,
          data.workplace,
          data.workplace,
          data.start_time,
          data.start_time,
          data.end_time,
          data.end_time,
        ],*/
        [
          worker,
          worker,
          project,
          project,
          workplace,
          workplace,
          starttime,
          starttime,
          endtime,
          endtime,
        ],
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
  } else {
    res.status(400).json("Bad request");
  }
};

const getWork = async (req, res) => {
  const { IDdela: workID } = req.params;
  if (workID) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        throw err;
      }
      connection.query(
        "SELECT * FROM delo WHERE IDdela = ?",
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
              console.log("Cannot release connection to database");
              throw err;
            }
            console.log("Connection released.");
          }
        }
      );
    });
  } else {
    res.status(400).json("Bad request");
  }
};

const addWork = async (req, res) => {
  const data = {
    worker: req.body.ime,
    project: req.body.projekt,
    workplace: req.body.stroj,
    start_time: req.body.zacetni_cas,
    end_time: req.body.koncni_cas,
  };
  console.log(data);
  if (
    data.worker &&
    data.project &&
    data.workplace &&
    data.start_time &&
    data.end_time
  ) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        throw err;
      }
      console.log("Connection established");
      connection.query(
        "INSERT INTO delo (ime, projekt, stroj, zacetni_cas, koncni_cas) VALUES (?, ?, ?, ?, ?)",
        [
          data.worker,
          data.project,
          data.workplace,
          data.start_time,
          data.end_time,
        ],
        (err, result) => {
          if (err) {
            console.log("Server error");
            res.status(500);
            throw err;
          }
          //const response = generateURL(?); Ne vemo IDja?
          //res.status(201).json(response);
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
    res.status(400).json("Bad request");
  }
};

const updateWork = async (req, res) => {
  const data = {
    worker: req.body.ime,
    project: req.body.projekt,
    workplace: req.body.stroj,
    start_time: req.body.zacetni_cas,
    end_time: req.body.koncni_cas,
  };
  const { IDdela: workID } = req.params;
  if (
    workID &&
    data.worker &&
    data.project &&
    data.workplace &&
    data.start_time &&
    data.end_time
  ) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        throw err;
      }
      console.log("Connection established");
      connection.query(
        "UPDATE delo SET ime = ?, projekt = ?, stroj = ?, zacetni_cas = ?, koncni_cas = ? WHERE IDdela = ?",
        [
          data.worker,
          data.project,
          data.workplace,
          data.start_time,
          data.end_time,
          workID,
        ],
        (err, result) => {
          if (err) {
            console.log("Server error");
            res.status(500);
            throw err;
          }
          res.status(204).json("Work " + workID + " updated!");

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
    res.status(400).json("Bad request");
  }
};

const deleteWork = async (req, res) => {
  //const { IDdela: workID } = req.query;
  const workID = req.params.IDdela;

  if (workID) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        throw err;
      }
      console.log("Connection established");
      connection.query(
        "DELETE FROM delo WHERE IDdela = ?",
        [workID],
        (err, result) => {
          if (err) {
            console.log("Server error: ", err);
            res.status(500);
          }
          console.log(result);

          res.status(204).json("Work " + workID + " deleted!");

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
    res.status(400).json("Bad request");
  }
};

module.exports = {
  //getAllWorks,
  getWorks,
  getWork,
  addWork,
  updateWork,
  deleteWork,
};
