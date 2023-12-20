const connectDB = require("../db/connection").pool;

const checkProjectID = require("./checker").checkProjectID;

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

const addProject = async (req, res) => {
  const data = {
    projectID: req.body.projekt,
  };
  console.log(data);
  if (data.projectID) {
    const freeID = await checkProjectID(data.projectID);
    if (freeID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "INSERT INTO narocilo (projekt) VALUES (?)",
          [data.projectID],
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
      res.status(409).json("Project ID already exists!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const updateProject = async (req, res) => {
  const data = {
    status: req.body.status,
    time: req.body.cas,
  };
  const { projekt: projectID } = req.params;
  console.log(projectID);
  if (
    projectID &&
    (data.status === 0 || data.status === 1) &&
    data.time !== ""
  ) {
    const freeID = await checkProjectID(projectID);
    if (!freeID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "UPDATE narocilo SET status = ?, cas = ? WHERE projekt = ?",
          [data.status, data.time, projectID],
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
      res.status(404).json("Project does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const deleteProject = async (req, res) => {
  const { projekt: projectID } = req.params;

  if (projectID) {
    const freeID = await checkProjectID(projectID);
    if (!freeID) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "DELETE FROM narocilo WHERE projekt = ?",
          [projectID],
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
      res.status(404).json("Project does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

module.exports = {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
};
