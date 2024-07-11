const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./users.db";

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE Service (
  USERNAME varchar(2000),
  EMAIL varchar(2000),
  CARTITEMS TEXT
);
`);
}

module.exports = createDbConnection();