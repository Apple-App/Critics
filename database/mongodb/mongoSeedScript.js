const mongoose = require('mongoose');
const Critic = require('./mongoModel.js');
const Review = require('./mongoModel.js');
const faker = require('faker');
const { performance } = require('perf_hooks');
const time = performance.now();
const createCsvwriter = require('csv-writer').createObjectCsvWriter;

const criticsCsvWriter = createCsvwriter({
  path: '/Users/sujinlee/Critics/database/critics.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'name', title: 'name' },
    { id: 'topCritic', title: 'topCritic' },
    { id: 'publisher', title: 'publisher' },
    { id: 'picture', title: 'picture' },
  ]
});

const reviewsCsvWriter = createCsvwriter({
  path: '/Users/sujinlee/Critics/database/reviews.csv',
  header: [
    { id: 'id', title: 'id' },
    { id: 'criticId', title: 'criticId' },
    { id: 'text', title: 'text' },
    { id: 'rating', title: 'rating' },
    { id: 'movieId', title: 'movieId' },
    { id: 'date', title: 'date' }
  ]
});

const criticBatchSize = 10000, criticBatches = 100;
const reviewBatchSize = 10000, reviewBatches = 2000;
let totalReviewCount = 0, currReviewBatch = 0;
let totalCriticCount = 0, currCriticBatch = 0;

const writeCriticsData = () => {
  let criticsArray = null;
  criticsArray = generateCriticsData(criticBatchSize);

  criticsCsvWriter.writeRecords(criticsArray)
    .then(() => {
      if (currCriticBatch < criticBatches) {
        currCriticBatch++;
        if (totalCriticCount === (criticBatches * criticBatchSize)) {
          console.log(performance.now() - time);
        }
        if (totalCriticCount < (criticBatches * criticBatchSize)) {
          writeCriticsData();
        }
      }
    })
    .catch(err => console.log('Error writing critic CSV', err));
}

const generateCriticsData = (criticBatchSize) => {
  let criticsArray = [];

  for (let i = currCriticBatch * criticBatchSize; i < (criticBatchSize + (currCriticBatch * criticBatchSize)); i++) {
    let criticsItem = {};
    totalCriticCount++;

    let num1 = faker.random.number({ max: 1 });
    const picture = ["http://dummyimage.com/100x100.jpg/dddddd/000000", "http://dummyimage.com/100x100.jpg/cc0000/ffffff"];

    criticsItem.id = i;
    criticsItem.name = faker.name.findName();
    criticsItem.topCritic = num1;
    criticsItem.publisher = faker.company.companyName();
    criticsItem.picture = picture[num1];

    criticsArray.push(criticsItem);
  }
  return criticsArray;
}

const writeReviewsData = () => {
  let reviewsArray = null;
  reviewsArray = generateReviewsData(reviewBatchSize);

  reviewsCsvWriter.writeRecords(reviewsArray)
    .then(() => {
      if (currReviewBatch < reviewBatches) {
        currReviewBatch++;
        if (totalReviewCount === (reviewBatches * reviewBatchSize)) {
          console.log(performance.now() - time);
        }
        if (totalReviewCount < (reviewBatches * reviewBatchSize)) {
          writeReviewsData();
        }
      }
    })
    .catch(err => console.log('Error writing review CSV', err));
}

const generateReviewsData = (reviewBatchSize) => {
  let reviewsArray = [];

  for (let i = currReviewBatch * reviewBatchSize; i < (reviewBatchSize + (currReviewBatch * reviewBatchSize)); i++) {
    let reviewsItem = {};
    totalReviewCount++;

    let num1 = faker.random.number({ max: 1 });
    let num2 = faker.random.number({ max: 10000 });
    let num3 = faker.random.number({ min: 1, max: 10000000 })

    reviewsItem.id = i;
    reviewsItem.criticId = num2;
    reviewsItem.text = faker.lorem.paragraph();
    reviewsItem.rating = num1;
    reviewsItem.movieId = num3;
    reviewsItem.date = faker.date.recent();

    reviewsArray.push(reviewsItem);
  }
  return reviewsArray;
}

writeCriticsData();
writeReviewsData();

//const {exec} = child_process

//Directly import CSV file into MongoDB:
  //mongoimport -d Critics -c critics --type csv --file database/critics.csv --headerline
  //mongoimport -d Critics -c reviews --type csv --file database/reviews.csv --headerline
