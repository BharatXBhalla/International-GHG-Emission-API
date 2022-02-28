const sqlite3 = require('sqlite3')


const dbfilelocation = "./database/ghg.db";

var db= new sqlite3.Database(dbfilelocation, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });



module.exports = db




