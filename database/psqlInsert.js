var client = require('./psqlIndex.js');
let query = `DROP TABLE IF EXISTS critics;
CREATE TABLE critics (
  id serial primary key,
  penName VARCHAR(64) NULL DEFAULT NULL,
  topCritic INTEGER NULL DEFAULT NULL,
  publisher VARCHAR(64) NULL DEFAULT NULL,
  picture VARCHAR(500) NULL DEFAULT NULL
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
  id serial primary key,
  criticId INTEGER NULL DEFAULT NULL,
  txt TEXT NULL DEFAULT NULL,
  rating INTEGER NULL DEFAULT NULL,
  movieId INTEGER NULL DEFAULT NULL,
  pubDate VARCHAR(36) NULL DEFAULT NULL
);

ALTER TABLE reviews ADD FOREIGN KEY (criticId) REFERENCES critics (id);

`
// \copy critics from '/usr/local/var/postgres/critics.csv' DELIMITERS ',' CSV HEADER;
// \copy reviews from '/usr/local/var/postgres/reviews.csv' DELIMITERS ',' CSV HEADER;
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