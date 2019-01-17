const mySQLConnection = require('../index.js');

mySQLConnection.query(`SET bulk_insert_buffer_size= 1024 * 1024 * 256;`, (err, results) => {
    if (err) {
        console.log('bulk insert buffer size error', err);
        return;
    }
    console.log('Results of setting bulk_insert_buffer_size: ', results);
});

mySQLConnection.query(`LOAD DATA LOCAL INFILE '/Users/sujinlee/Critics/database/critics.csv' INTO TABLE critics
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS`, (err, results) => {
    if (err) {
        console.log('load critics csv file error', err);
        return;
    }
    console.log('Results of load critics csv file: ', results);
});

mySQLConnection.query(`LOAD DATA LOCAL INFILE '/Users/sujinlee/Critics/database/reviews.csv' INTO TABLE reviews
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS`, (err, results) => {
    if (err) {
        console.log('load reviews csv file error', err);
        return;
    }
    console.log('Results of load reviews csv file: ', results);
})