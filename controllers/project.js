const connectDB = require("../db/connection").pool;

const checkProject = require("./checker").checkProject;

const prepareResponse = require("./tools").prepareResponse;
const generateURL = require("./tools").generateURL;

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

  if (projectID) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        throw err;
      }
      console.log("Connection established");
      connection.query(
        "SELECT * FROM narocilo WHERE projekt = ?",
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
};

const addProject = async (req, res) => {
  const data = {
    projectID: req.body.projekt,
    status: req.body.status,
  };
  console.log(data);
  if (data.projectID && (data.status === 0 || data.status === 1)) {
    const freeID = await checkProject(data.projectID);
    if (freeID.length === 0) {
      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          throw err;
        }
        console.log("Connection established");
        connection.query(
          "INSERT INTO narocilo (projekt, status) VALUES (?, ?)",
          [data.projectID, data.status],
          (err, result) => {
            if (err) {
              console.log("Server error");
              res.status(500);
              throw err;
            }
            //const response = generateURL(data.projectID);
            //res.status(201).json(response);
            res.status(201).json("Project " + data.projectID + " added!");

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
      const errorMsg = prepareResponse("Project ID already exists!", 106);
      res.status(409).json({ errorMsg });
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
  if (
    projectID &&
    (data.status === 0 || data.status === 1) &&
    data.time !== ""
  ) {
    const freeID = await checkProject(projectID);
    if (freeID.length !== 0) {
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
            res.status(204).json("Project " + projectID + " updated!");

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
      const errorMsg = prepareResponse("Project does not exist!", 107);
      res.status(404).json({ errorMsg });
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const deleteProject = async (req, res) => {
  const { projekt: projectID } = req.params;

  if (projectID) {
    const freeID = await checkProject(projectID);
    if (freeID.length !== 0) {
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

            res.status(204).json("Project " + projectID + " deleted!");

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
      const errorMsg = prepareResponse("Project does not exist!", 107);
      res.status(404).json({ errorMsg });
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
