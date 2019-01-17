const mongoose = require('mongoose')
const uriString = 'mongodb://localhost/Critics';
// process.env.MONGODB_URI || 
mongoose.connect(uriString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log('Connection succeeded');
});

module.exports = db;

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('sdc-critics', 'username', 'password') {
//   host: 'localhost',
//   dialect: 'postgres',
// }


// const Critic = sequelize.define('critic', {
//   id: Sequelize.NUMBER,
//   name: Sequelize.STRING
// })

// const Review = db.define('Review', {
//   id: Sequelize.NUMBER,
//   criticid: Sequelize.NUMBER
// });

// sequelize.sync()
//   .then(() => Critic.create({
    
//   }))
