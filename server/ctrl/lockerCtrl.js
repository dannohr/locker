const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./db/lockers.db");

let sql = `SELECT * FROM lockers`;

let lockers = [];

module.exports = {
  getAllLockers: (req, res, next) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.status(200).json(rows);
      //db.close();
    });
  }
};
