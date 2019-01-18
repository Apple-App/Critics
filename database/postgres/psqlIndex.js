var pg = require('pg');

var client = new pg.Pool({connectionString : connection});

var URI = process.env.PGURI !== undefined ? process.env.PGURI : 'postgres://postgres: @localhost:5432/badapples';

client.connect(err => {
    if (err) {
      console.log("Error connecting to psql database", err);
    } else {
      console.log("Psql database connection successful");
    }
  });
  
module.exports = client;