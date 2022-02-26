const db=require("./dbconnection");

const app = require('./app');

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);


//Releasing Resources 
process.on('exit', function(){
    db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
});
