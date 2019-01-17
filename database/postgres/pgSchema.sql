-- psql postgres;

CREATE DATABASE badapples;

-- \c badapples;
`DROP TABLE IF EXISTS `critics`;
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


-- \copy critics from 'database/critics.csv' DELIMITERS ',' CSV;
-- \copy reviews from 'database/reviews.csv' DELIMITERS ',' CSV;

-- psql -U postgres -f database/pgSchema.sql