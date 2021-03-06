CREATE DATABASE `FEC`;

USE `FEC`;

DROP TABLE IF EXISTS `critics`;

CREATE TABLE `critics` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NULL DEFAULT NULL,
  `topCritic` INTEGER NULL DEFAULT NULL,
  `publisher` VARCHAR(64) NULL DEFAULT NULL,
  `picture` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `reviews`;
		
CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `criticId` INTEGER NULL DEFAULT NULL,
  `text` VARCHAR(400) NULL DEFAULT NULL,
  `rating` INTEGER NULL DEFAULT NULL,
  `movieId` INTEGER(10) NULL DEFAULT NULL,
  `date` VARCHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `reviews` ADD FOREIGN KEY (criticId) REFERENCES `critics` (`id`);

-- LOAD DATA LOCAL INFILE '/Users/sujinlee/Critics/database/critics.csv'
-- INTO TABLE critics
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS

-- LOAD DATA LOCAL INFILE '/Users/sujinlee/Critics/database/reviews.csv'
-- INTO TABLE reviews
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS
