const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./lockers.db");

let modbusSQL = `SELECT * FROM lockers`;

db.run(`INSERT INTO lockers(port, number) VALUES(16,12)`, ["C"], function(err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

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
  //res.status(200).json(rows);
  //db.close();
});
