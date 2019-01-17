var fs = require('fs');
var mysql = require('mysql');
var connection = require('../index.js');
const { performance } = require('perf_hooks');
const time = performance.now();

const limit = 1000;
var dataInsertCritics = function () {
    fs.readFile(__dirname + '/critics.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error importing data', err)
        } else {
            var critic = JSON.parse(data);
            for (var j = 0; j < limit; j++) {
            for (var i = 0; i < critic.length; i++) {
                connection.query(`INSERT INTO \`critics\` (name, topCritic, publisher, picture) VALUES (?,?,?,?);`, [critic[i].name, Number(critic[i].topCritic), critic[i].publisher, critic[i].picture], function (err) {
                    if (err) {
                        console.log('Error saving to database', err)
                    } else {
                        // console.log('Saved!')
                    }
                })
            }
        }
        }
    });
}

var dataInsertReviews = function () {
    fs.readFile(__dirname + '/reviews.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Error importing data', err)
        } else {
            var review = JSON.parse(data);
            for (var j = 0; j < limit.length; j++) {
            for (var i = 0; i < review.length; i++) {
                connection.query(`INSERT INTO \`reviews\` (criticId, text, rating, movieId, date) VALUES (?,?,?,?,?);`, [review[i].criticId, review[i].text, review[i].rating, review[i].movieId, review[i].date], function (err) {
                    if (err) {
                        console.log('Error saving to database', err)
                    } else {
                        // console.log('Saved!')
                    }
                })
            }
        }
        }
    });
}

dataInsertCritics();
dataInsertReviews();
