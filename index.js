const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require('cors');

app.use(cors())
app.use(express.json());

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

function ReadDatabaseUser(user,email, functionToCallWithRows) {
  const sqlite3 = require('sqlite3').verbose();
  // open the database
  let db = new sqlite3.Database('./users.db');
  
  let sql = `SELECT *
              FROM Service
              WHERE USERNAME = ? AND EMAIL = ?
              ORDER BY USERNAME`;
  
  db.get(sql, [user,email], (err, row) => {
    if (err) {
      throw err;
    }
    functionToCallWithRows(row)
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

function AddData(user,email,cartItems) {
  const serializedList = JSON.stringify(cartItems);
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database('./users.db');
  db.run("DELETE from Service WHERE USERNAME = ? AND EMAIL = ?",[user,email],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`1 entry deleted`);
    }
  )
  db.run(
    `INSERT INTO Service (USERNAME, EMAIL, CARTITEMS) VALUES (?, ?, ?)`,
    [user,email,serializedList],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
  db.close()
}

app.post('/cart', (req, res) => {
  AddData(req.body.user,req.body.email,req.body.cartItems)
  res.send({data: "Success"});
})

app.get('/cartItems', (req,res) => {
  ReadDatabaseUser(req.query.user,req.query.email, (row) => {
    res.send({data: row});
  })
})

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