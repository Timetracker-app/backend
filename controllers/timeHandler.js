const connectDB = require("../db/connection").pool;

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
    if (newTime < currentTime) {
      var updatedTime_ms = currentTime - newTime;
    } else {
      var updatedTime_ms = 0;
    }
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
