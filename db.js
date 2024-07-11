const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./service.db";

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
  NAME varchar(2000),
  PPL float,
  VOLUME float,
  FIRST int,
  SECOND int,
  THIRD int,
  PLASTIC float,
  GLASS float,
  IMAGE varchar(60000),
  CATEGORY varchar(2000),
  CAPACITY int
);
`);
}

module.exports = createDbConnection();