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
            console.log("Igralec ne obstaja!");
            resolve(true);
          } else {
            console.log("Igralec obstaja!");
            resolve(false);
          }
        }
      );
    });
  });
}

module.exports = checkName;
