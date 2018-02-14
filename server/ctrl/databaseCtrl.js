const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./db/lockers.db");

let modbusSQL = `SELECT * FROM modbus`;
let lockerSQL = `SELECT * FROM lockers`;

module.exports = {
  getMusbusServer: (req, res, next) => {
    let db = new sqlite3.Database("./db/lockers.db");
    db.all(modbusSQL, [], (err, rows) => {
      if (err) {
        throw err;
      }

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].active == 1) {
          rows[i].checked = true;
        } else {
          rows[i].checked = false;
        }
      }
      console.log(rows);
      res.status(200).json(rows);
      //db.close();
    });
  },
  postMusbusServer: (req, res, next) => {
    console.log(req.body);
    let db = new sqlite3.Database("./db/lockers.db");
    let { id, ip, port, numcards, active } = req.body;
    let data = [ip, port, numcards, active, id];
    let sql = `UPDATE modbus
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
