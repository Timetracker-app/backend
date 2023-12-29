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
        "SELECT ime FROM delavec WHERE ime = ?",
        [name],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          if (result.length === 0) {
            console.log("Name is free to use.");
            resolve(true);
          } else {
            console.log("Name already exists!");
            resolve(false);
          }
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
        "SELECT email FROM delavec WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          if (result.length === 0) {
            console.log("Email is free to use.");
            resolve(true);
          } else {
            console.log("Email already exists!");
            resolve(false);
          }
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
        "SELECT stroj, status FROM delovno_mesto WHERE stroj = ?",
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
        "SELECT projekt, status FROM narocilo WHERE projekt = ?",
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
        "SELECT * FROM delo WHERE IDdela = ?",
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
