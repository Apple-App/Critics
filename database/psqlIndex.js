var pg = require('pg');
var connection = 'postgres://postgres: @localhost:5432/badapples';

var client = new pg.Client(connection);

client.connect(err => {
    if (err) {
      console.log("Error connecting to psql database", err);
    } else {
      console.log("Psql database connection successful");
    }
  });
  
module.exports = client;