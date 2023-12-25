const connectDB = require("../db/connection").pool;

async function getProjectTime(projectID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT zacetni_cas, koncni_cas FROM delo WHERE projekt = ?",
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
            resolve(result);

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

async function updateProjectTime(projectID, time) {
  var newTime = 0;
  var timeDiff = 0;
  var endTime = 0;
  var startTime = 0;

  for (let i = 0; i < Object.keys(time).length; i++) {
    endTime = new Date(time[i].koncni_cas);
    startTime = new Date(time[i].zacetni_cas);

    timeDiff = endTime - startTime;
    newTime = newTime + timeDiff;
  }
  const hours = Math.floor(newTime / (1000 * 60 * 60));
  const minutes = Math.floor((newTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((newTime % (1000 * 60)) / 1000);

  const formattedTime =
    addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);

  console.log(formattedTime);

  function addZero(num) {
    return (num < 10 ? "0" : "") + num;
  }

  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "UPDATE narocilo SET cas = ? WHERE projekt = ?",
        [formattedTime, projectID],
        (err, result) => {
          if (err) {
            console.log("Server error");
            reject(err);
          } else {
            console.log(result);
            resolve(result);

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

async function getWorkplaceTime(workplaceID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT zacetni_cas, koncni_cas FROM delo WHERE stroj = ?",
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
            resolve(result);

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

async function updateWorkplaceTime(workplaceID, time) {
  var newTime = 0;
  var timeDiff = 0;
  var endTime = 0;
  var startTime = 0;

  for (let i = 0; i < Object.keys(time).length; i++) {
    endTime = new Date(time[i].koncni_cas);
    startTime = new Date(time[i].zacetni_cas);

    timeDiff = endTime - startTime;
    newTime = newTime + timeDiff;
  }
  const hours = Math.floor(newTime / (1000 * 60 * 60));
  const minutes = Math.floor((newTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((newTime % (1000 * 60)) / 1000);

  const formattedTime =
    addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);

  console.log(formattedTime);

  function addZero(num) {
    return (num < 10 ? "0" : "") + num;
  }

  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Cannot connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "UPDATE delovno_mesto SET cas = ? WHERE stroj = ?",
        [formattedTime, workplaceID],
        (err, result) => {
          if (err) {
            console.log("Server error");
            reject(err);
          } else {
            console.log(result);
            resolve(result);

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

module.exports = {
  getProjectTime,
  updateProjectTime,
  getWorkplaceTime,
  updateWorkplaceTime,
};
