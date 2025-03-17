const connectDB = require("../db/connection").pool;

async function checkName(name) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT name, email, status FROM worker WHERE name = ?",
        [name],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          resolve(result);
        }
      );
    });
  });
}

async function checkEmail(email) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT email FROM worker WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          resolve(result);
        }
      );
    });
  });
}

async function checkWorkplace(workplaceID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT name, status FROM workplace WHERE name = ?",
        [workplaceID],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          resolve(result);
        }
      );
    });
  });
}

async function checkProject(projectID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT name, status FROM project WHERE name = ?",
        [projectID],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          resolve(result);
        }
      );
    });
  });
}

async function checkWorkID(workID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT * FROM work WHERE workID = ?",
        [workID],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          resolve(result);
        }
      );
    });
  });
}

module.exports = {
  checkName,
  checkEmail,
  checkWorkplace,
  checkProject,
  checkWorkID,
};
