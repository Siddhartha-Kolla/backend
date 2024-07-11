const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('mydatabase.db');

// Create a table for your main data
db.run(`
  CREATE TABLE IF NOT EXISTS my_table (
    id INTEGER PRIMARY KEY,
    list_data TEXT
  )
`);

// Example list to store
const myList = [{product:{id:2,name:"Adelholzener Mineralwasser Classic",ppl:0.87,volume:1,first:6,second:12,third:30,plastic:0.25,glass:0.5,image:"min_was_adel_cla_one.jpg",category:"water",capacity:20},quantity:2},{product:{id:22,name:"Jacobs Espresso",ppl:56.9,volume:0.1,first:6,second:12,third:30,plastic:0.25,glass:0.5,image:"esp_jac_point_one.png",category:"warm",capacity:20},quantity:2}];

// Serialize the list and insert it into the table
const serializedList = JSON.stringify(myList);
db.run('INSERT INTO my_table (list_data) VALUES (?)', serializedList);

// Retrieve the list from the database
db.get('SELECT list_data FROM my_table WHERE id = 5', (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }
  const retrievedList = JSON.parse(row.list_data);
  console.log('Retrieved list:', retrievedList);
  console.log("Name of the second product: ",retrievedList[1].product.name)
});

// Close the database connection
db.close();
