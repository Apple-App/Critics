var pg = require('pg');
// var connection = 'postgres://postgres: @localhost:5432/badapples';
var connection = 'postgres://postgres: @172.31.30.68/badapples';

var client = new pg.Pool({connectionString : connection});

client.connect(err => {
    if (err) {
      console.log("Error connecting to psql database", err);
    } else {
      console.log("Psql database connection successful");
    }
  });
  
module.exports = client;