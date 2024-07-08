const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('./service.db');

let sql = `SELECT *
            FROM Service
            WHERE CATEGORY = ?
            ORDER BY NAME`;

db.each(sql, ['water'], (err, row) => {
  if (err) {
    throw err;
  }
  console.log(row);
});

// close the database connection
db.close();