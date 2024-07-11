const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("./db");

fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    console.log(row)
    db.serialize(function () {
      db.run(
        `INSERT INTO Service (NAME, PPL, VOLUME, FIRST, SECOND, THIRD, PLASTIC, GLASS, IMAGE,CATEGORY,CAPACITY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
        [row[0], row[1], row[2], row[3], row[4], row[5], row[6],row[7],row[8],row[9],row[10]],
        function (error) {
          if (error) {
            return console.log(error.message);
          }
          console.log(`Inserted a row with the id: ${this.lastID}`);
        }
      );
    });
  });