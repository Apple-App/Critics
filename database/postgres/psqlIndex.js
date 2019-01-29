var pg = require('pg');

// var URI = process.env.PGURI !== undefined ? process.env.PGURI : 'postgres://postgres:\ @localhost:5432/badapples';

var client = new pg.Pool({
  host: '',
  user: 'postgres',
  database: 'badapples'
});
// var client = new pg.Pool({connectionString : 'postgres://postgres: @localhost:5432/badapples'});

client.connect(err => {
    if (err) {
      console.log("Error connecting to psql database", err);
    } else {
      console.log("Psql database connection successful");
    }
  });
  
module.exports = client;