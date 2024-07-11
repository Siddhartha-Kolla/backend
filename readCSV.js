const fs = require("fs");
const { parse } = require("csv-parse");
var data_collection = []

fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
    data_collection.push(row)
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

console.log(data_collection)
const db = require("./db");

function insertRow(datas) {
  const [name,ppl,volume,first,second,third,plastic,glass,image,category,capacity] = datas;
  db.run(
    `INSERT INTO Service (NAME, PPL, VOLUME, FIRST, SECOND, THIRD, PLASTIC, GLASS, IMAGE,CATEGORY;CAPACITY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
    [name,ppl,volume,first,second,third,plastic,glass,image,category,capacity],
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}


console.log(data_collection[0])