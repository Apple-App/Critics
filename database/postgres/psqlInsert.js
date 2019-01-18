var client = require('./psqlIndex.js');
let query = `
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS critics;
CREATE TABLE critics (
  id SERIAL PRIMARY KEY,
  penName VARCHAR(64) NULL DEFAULT NULL,
  topCritic INTEGER NULL DEFAULT NULL,
  publisher VARCHAR(64) NULL DEFAULT NULL,
  picture VARCHAR(500) NULL DEFAULT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  criticId INTEGER REFERENCES critics(id),
  txt TEXT NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  movieId INTEGER NULL DEFAULT NULL,
  pubDate VARCHAR(200) NULL DEFAULT NULL
);

CREATE INDEX movieId_idx ON reviews (movieId);
`
//CREATE INDEX movieId_idx ON reviews (movieId);
// \copy critics from '/Library/PostgreSQL/11/data/critics.csv' DELIMITERS ',' CSV HEADER;
// \copy reviews from '/Library/PostgreSQL/11/data//reviews.csv' DELIMITERS ',' CSV HEADER;
console.time('done');
client.query(query, (err, results) => {
  if (err) {
      console.log(err);
  } else {
    client.query(`COPY critics from 'critics.csv' DELIMITERS ',' CSV HEADER; COPY reviews from 'reviews.csv' DELIMITERS ',' CSV HEADER;`
    )
    .then(() => {
      console.timeEnd('done');
    })
  }
})