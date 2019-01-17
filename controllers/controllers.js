const client = require("../database/postgres/psqlIndex.js");

exports.getReviews = function(req, res) {
  const movieId = req.params.number;
  
  client.query(
    `select * from reviews r inner join critics c on r.criticId = c.id where r.movieId = ${movieId}`,
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(results.rows);
      }
    }
  );
};
