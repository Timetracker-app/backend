const connectDB = require("../db/connection").pool;

/*
async function getProjectTime(projectID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT cas FROM narocilo WHERE projekt = ?",
        [projectID],
        (err, result) => {
          if (err) {
            console.log("Server error");
            res.status(500);
            reject(err);
          }
          if (result.length === 0) {
            console.log("Not found");
          } else {
            console.log(result);
            resolve(result[0].cas);

            connection.release();
            if (err) {
              console.log("Can not release connection to database");
              reject(err);
            }
            console.log("Connection released.");
          }
        }
      );
    });
  });
}

async function updateProjectTime(projectID, newTime_ms, type) {
  try {
    const currentTime = await getProjectTime(projectID);

    const currentTime_ms = timeToMs(currentTime);
    const updatedTime = formatTime(currentTime_ms, newTime_ms, type);

    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "UPDATE narocilo SET cas = ? WHERE projekt = ?",
        [updatedTime, projectID],
        (err, result) => {
          if (err) {
            console.log("Server error");
            throw err;
          } else {
            console.log(result);

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
  } catch (error) {
    console.log("Error updating project time: ", error);
    throw error;
  }
}

/*
async function updateProjectTime(projectID, newTime_ms, type) {
  getProjectTime(projectID)
    .then((currentTime) => {
      const currentTime_ms = timeToMs(currentTime);

      const updatedTime = formatTime(currentTime_ms, newTime_ms, type);

      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          reject(err);
        }
        console.log("Connection established");

        connection.query(
          "UPDATE narocilo SET cas = ? WHERE projekt = ?",
          [updatedTime, projectID],
          (err, result) => {
            if (err) {
              console.log("Server error");
              throw err;
            } else {
              console.log(result);

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
    })
    .catch((error) => {
      console.log("Error getting project time: ", error);
    });
}

async function getWorkplaceTime(workplaceID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT cas FROM delovno_mesto WHERE stroj = ?",
        [workplaceID],
        (err, result) => {
          if (err) {
            console.log("Server error");
            res.status(500);
            reject(err);
          }
          if (result.length === 0) {
            console.log("Not found");
          } else {
            console.log(result);
            resolve(result[0].cas);

            connection.release();
            if (err) {
              console.log("Can not release connection to database");
              reject(err);
            }
            console.log("Connection released.");
          }
        }
      );
    });
  });
}

async function updateWorkplaceTime(workplaceID, newTime_ms, type) {
  try {
    const currentTime = await getWorkplaceTime(workplaceID);

    const currentTime_ms = timeToMs(currentTime);
    const updatedTime = formatTime(currentTime_ms, newTime_ms, type);

    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "UPDATE delovno_mesto SET cas = ? WHERE stroj = ?",
        [updatedTime, workplaceID],
        (err, result) => {
          if (err) {
            console.log("Server error");
            throw err;
          } else {
            console.log(result);

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
  } catch (error) {
    console.log("Error updating workplace time: ", error);
    throw error;
  }
}
/*
async function updateWorkplaceTime(workplaceID, newTime_ms, type) {
  getWorkplaceTime(workplaceID)
    .then((currentTime) => {
      const currentTime_ms = timeToMs(currentTime);

      const updatedTime = formatTime(currentTime_ms, newTime_ms, type);

      connectDB.getConnection((err, connection) => {
        if (err) {
          console.log("Cannot connect to database");
          reject(err);
        }
        console.log("Connection established");

        connection.query(
          "UPDATE delovno_mesto SET cas = ? WHERE stroj = ?",
          [updatedTime, workplaceID],
          (err, result) => {
            if (err) {
              console.log("Server error");
              throw err;
            } else {
              console.log(result);

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
    })
    .catch((error) => {
      console.log("Error getting workplace time: ", error);
    });
}
*/
async function getProjectTime(projectID) {
  try {
    const connection = await getConnection();

    const result = await queryDatabase(
      connection,
      "SELECT cas FROM narocilo WHERE projekt = ?",
      [projectID]
    );

    if (result.length === 0) {
      console.log("Not found");
      return null;
    } else {
      console.log(result[0]);
      return result[0].cas;
    }
  } catch (error) {
    console.log("Error getting project time: ", error);
    throw error;
  }
}

async function updateProjectTime(projectID, newTime_ms, type) {
  try {
    const currentTime = await getProjectTime(projectID);
    if (currentTime === null) {
      console.log("Project not found");
      return;
    }

    const currentTime_ms = timeToMs(currentTime);
    const updatedTime = formatTime(currentTime_ms, newTime_ms, type);

    const connection = await getConnection();

    await queryDatabase(
      connection,
      "UPDATE narocilo SET cas = ? WHERE projekt = ?",
      [updatedTime, projectID]
    );

    //await releaseConnection(connection);
  } catch (error) {
    console.log("Error updating project time: ", error);
    throw error;
  }
}

async function getWorkplaceTime(workplaceID) {
  try {
    const connection = await getConnection();

    const result = await queryDatabase(
      connection,
      "SELECT cas FROM delovno_mesto WHERE stroj = ?",
      [workplaceID]
    );

    if (result.length === 0) {
      console.log("Not found");
      return null;
    } else {
      console.log(result[0]);
      return result[0].cas;
    }
  } catch (error) {
    console.log("Error getting project time: ", error);
    throw error;
  }
}

async function updateWorkplaceTime(workplaceID, newTime_ms, type) {
  try {
    const currentTime = await getWorkplaceTime(workplaceID);
    if (currentTime === null) {
      console.log("Project not found");
      return;
    }

    const currentTime_ms = timeToMs(currentTime);
    const updatedTime = formatTime(currentTime_ms, newTime_ms, type);

    const connection = await getConnection();

    await queryDatabase(
      connection,
      "UPDATE delovno_mesto SET cas = ? WHERE stroj = ?",
      [updatedTime, workplaceID]
    );

    //await releaseConnection(connection);
  } catch (error) {
    console.log("Error updating project time: ", error);
    throw error;
  }
}

function getConnection() {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");
      resolve(connection);
    });
  });
}
/*
function releaseConnection(connection) {
  return new Promise((resolve, reject) => {
    connection.release();
    if (err) {
      console.log("Can not release connection to the database");
      reject(err);
    }
    console.log("Connection released.");
    resolve();
  });
}
*/
function queryDatabase(connection, sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.log("Server error");
        reject(err);
      } else {
        console.log(result);
        resolve(result);

        connection.release();
        console.log("Connection released.");
      }
    });
  });
}

function timeToMs(time) {
  const [hours, minutes, seconds] = time.split(":").map(Number);

  const totalMs = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

  return totalMs;
}

function formatTime(currentTime, newTime, type) {
  if (type === "add") {
    var updatedTime_ms = currentTime + newTime;
  } else if (type === "substract") {
    var updatedTime_ms = currentTime - newTime;
  }

  const hours = Math.floor(updatedTime_ms / (1000 * 60 * 60));
  const minutes = Math.floor((updatedTime_ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((updatedTime_ms % (1000 * 60)) / 1000);

  const updatedTime =
    addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);

  return updatedTime;

  function addZero(num) {
    return (num < 10 ? "0" : "") + num;
  }
}

module.exports = {
  updateProjectTime,
  updateWorkplaceTime,
};
