const client = require("../database/psqlIndex.js");

exports.getReviews = function(req, res) {
  const movieId = req.params.number;
  
  client.query(
    `select * from reviews r inner join critics c on r.criticId = c.id where r.movieId = ${movieId}`,
    // `select * from reviews where movieId = 2343`,
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        // let data = results.fields.map(field => {
        //   return {review: field}
        // });
        // console.log(results.rows);
        res.send(results.rows);
      }
    }
  );
};
