const express = require("express");
// const mysql = require("mysql");
// const connection = require("../database/index.js");
const port = 9003;
const app = express();
const router = require("../router/router.js");
const path = require("path");
var compression = require('compression');

app.use(compression());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/movies", router);

app.listen(port, err => {
  if (err) {
    console.log("Failure connecting to server");
  } else {
    console.log(`Listening on port ${port}!`);
  }
});
