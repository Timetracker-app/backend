const connectDB = require("../db/connection").pool;

const checkName = require("./checker").checkName;
const checkWorkplace = require("./checker").checkWorkplace;
const checkProject = require("./checker").checkProject;
const checkWorkID = require("./checker").checkWorkID;

const getProjectTime = require("./time").getProjectTime;
const updateProjectTime = require("./time").updateProjectTime;
const getWorkplaceTime = require("./time").getWorkplaceTime;
const updateWorkplaceTime = require("./time").updateWorkplaceTime;

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

const getWorks = async (req, res) => {
  const data = {
    worker: req.body.ime,
    project: req.body.projekt,
    workplace: req.body.stroj,
    start_time: req.body.zacetni_cas,
    end_time: req.body.koncni_cas,
  };
  console.log(data.start_time);

  if (
    typeof data.worker === "string" &&
    typeof data.project === "string" &&
    typeof data.workplace === "string" &&
    typeof data.start_time === "string" &&
    typeof data.end_time === "string"
  ) {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        throw err;
      }
      connection.query(
        "SELECT * FROM delo WHERE (ime = ? OR ? = '') AND (projekt = ? OR ? = '') AND (stroj = ? OR ? = '') AND (zacetni_cas >= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s') OR ? = '') AND (koncni_cas <= STR_TO_DATE(?, '%Y-%m-%d %H:%i:%s') OR ? = '');",
        [
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
    const workerID = await checkName(data.worker);
    const workplaceCheck = await checkWorkplace(data.workplace);
    const projectCheck = await checkProject(data.project);

    if (!workerID) {
      if (workplaceCheck.length !== 0) {
        if (projectCheck.length !== 0) {
          if (projectCheck[0].status === 1) {
            if (workplaceCheck[0].status === 1) {
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
                    res.status(201).json({ data });

                    connection.release();
                    if (err) {
                      console.log("Can not release connection to database");
                      throw err;
                    }
                    console.log("Connection released.");

                    // Updating project time
                    let timeToUpdateProject;

                    getProjectTime(data.project)
                      .then((time) => {
                        console.log(time);
                        timeToUpdateProject = time;
                      })
                      .catch((error) => {
                        console.error("Error getting time: ", error);
                      })
                      .then(() => {
                        // Update time
                        updateProjectTime(data.project, timeToUpdateProject)
                          .then((succes) => {
                            console.log(succes);
                          })
                          .catch((error) => {
                            console.log("Error updating time: ", error);
                          });
                      });

                    // Updating workplace time
                    let timeToUpdateWorkplace;

                    getWorkplaceTime(data.workplace)
                      .then((time) => {
                        console.log(time);
                        timeToUpdateWorkplace = time;
                      })
                      .catch((error) => {
                        console.error("Error getting time: ", error);
                      })
                      .then(() => {
                        // Update time
                        updateWorkplaceTime(
                          data.workplace,
                          timeToUpdateWorkplace
                        )
                          .then((succes) => {
                            console.log(succes);
                          })
                          .catch((error) => {
                            console.log("Error updating time: ", error);
                          });
                      });
                  }
                );
              });
            } else {
              res.status(409).json("Workplace is inactive!");
            }
          } else {
            res.status(409).json("Project is inactive!");
          }
        } else {
          res.status(404).json("Project does not exist!");
        }
      } else {
        res.status(404).json("Workplace does not exist!");
      }
    } else {
      res.status(404).json("Worker does not exist!");
    }
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
  console.log(workID);
  if (
    (workID,
    data.worker &&
      data.project &&
      data.workplace &&
      data.start_time &&
      data.end_time)
  ) {
    const workId = await checkWorkID(workID);
    const workerID = await checkName(data.worker);
    const workplaceID = await checkWorkplace(data.workplace);
    const projectID = await checkProject(data.project);

    if (!workId) {
      if (!workerID) {
        if (!workplaceID) {
          if (!projectID) {
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
                  res.status(204).json({ data });

                  connection.release();
                  if (err) {
                    console.log("Cannot release connection to database");
                    throw err;
                  }
                  console.log("Connection released.");

                  // Get time
                  let timeToUpdate;

                  getProjectTime(data.project)
                    .then((time) => {
                      console.log(time);
                      timeToUpdate = time;
                    })
                    .catch((error) => {
                      console.error("Error getting time: ", error);
                    })
                    .then(() => {
                      // Update time
                      updateProjectTime(data.project, timeToUpdate)
                        .then((succes) => {
                          console.log(succes);
                        })
                        .catch((error) => {
                          console.log("Error updating time: ", error);
                        });
                    });
                }
              );
            });
          } else {
            res.status(404).json("Project does not exist!");
          }
        } else {
          res.status(404).json("Workplace does not exist!");
        }
      } else {
        res.status(404).json("Worker does not exist!");
      }
    } else {
      res.status(404).json("Work does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};

const deleteWork = async (req, res) => {
  const { IDdela: workID } = req.params;

  if (workID) {
    const freeID = await checkWorkID(workID);
    if (!freeID) {
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
      res.status(404).json("Work does not exist!");
    }
  } else {
    res.status(400).json("Bad request");
  }
};
module.exports = {
  getAllWorks,
  getWorks,
  addWork,
  updateWork,
  deleteWork,
};
