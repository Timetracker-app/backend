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
        "SELECT ime, priimek, email FROM delavec WHERE ime = ?",
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

async function checkWorkplaceID(workplaceID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT stroj, cas, status FROM delovno_mesto WHERE stroj = ?",
        [workplaceID],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          if (result.length === 0) {
            console.log("Workplace ID is free to use.");
            resolve(true);
          } else {
            console.log("Workplace ID already exists!");
            resolve(false);
          }
        }
      );
    });
  });
}

async function checkProjectID(projectID) {
  return new Promise((resolve, reject) => {
    connectDB.getConnection((err, connection) => {
      if (err) {
        console.log("Can not connect to database");
        reject(err);
      }
      console.log("Connection established");

      connection.query(
        "SELECT projekt, cas, status FROM narocilo WHERE projekt = ?",
        [projectID],
        (err, result) => {
          if (err) {
            console.log("Error in query");
            reject(err);
          }
          connection.release();
          console.log("Connection released.");

          if (result.length === 0) {
            console.log("Project ID is free to use.");
            resolve(true);
          } else {
            console.log("Project ID already exists!");
            resolve(false);
          }
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

          if (result.length === 0) {
            console.log("Work ID is free to use.");
            resolve(true);
          } else {
            console.log("Work ID already exists!");
            resolve(false);
          }
        }
      );
    });
  });
}

module.exports = { checkName, checkWorkplaceID, checkProjectID, checkWorkID };
