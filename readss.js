const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('./service.db');

let sql = `SELECT *
            FROM Service
            WHERE CATEGORY = ?
            ORDER BY NAME`;

db.each(sql, ['dalksfkajkjsalkjflksajflkj'], (err, row) => {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log("Row",row);
});

// close the database connection
db.close();