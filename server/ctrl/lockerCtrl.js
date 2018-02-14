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
  },
  postLockerChange: (req, res, next) => {
    console.log(req.body);
    let db = new sqlite3.Database("./db/lockers.db");
    let { port, number } = req.body;
    let data = [port, number];
    let sql = `UPDATE locker
            SET ip = ?, port = ?, numcards = ?, active = ?
            WHERE id = ?`;

    db.run(sql, data, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
    });

    // close the database connection
    db.close();

    res.status(200).json(req.body);
  }
};
