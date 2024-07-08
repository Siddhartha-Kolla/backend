const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require('cors');

app.use(cors())

function ReadDatabase(category, functionToCallWithRows) {
  const sqlite3 = require('sqlite3').verbose();
  // open the database
  let db = new sqlite3.Database('./service.db');
  
  let sql = `SELECT *
              FROM Service
              WHERE CATEGORY = ?
              ORDER BY NAME`;
  
  db.all(sql, [category], (err, rows) => {
    if (err) {
      throw err;
    }
    functionToCallWithRows(rows)
  });
  
  // close the database connection
  db.close();
}

function ReadDatabaseAll(functionToCallWithRows) {
  const sqlite3 = require('sqlite3').verbose();
  // open the database
  let db = new sqlite3.Database('./service.db');
  
  let sql = `SELECT *
              FROM Service
              ORDER BY NAME`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    functionToCallWithRows(rows)
  });
  
  // close the database connection
  db.close();
}

app.get('/categories', (req, res) => {
  ReadDatabase(req.query.category, (rows) => {
    res.send({data: rows});
  })
  // res.json({ message: "Hello from serversss!" });
})

app.get('/all', (req, res) => {
  ReadDatabaseAll((rows) => {
    res.send({data: rows});
  })
  // res.json({ message: "Hello from serversss!" });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});