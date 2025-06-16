const db = require("../data/db");
const config = process.env;

const index = (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    movies = results.map((movie) => {
      movie.image = `${config.APP_URL}:${config.APP_PORT}/img/movies_cover/${movie.image}`;
      return movie;
    });

    res.json({ results });
  });
};

const show = (req, res) => {
  movieId = req.params.id;
  db.query("SELECT * FROM movies WHERE id = ?", [movieId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const movie = results[0];
    movie.image = `${config.APP_URL}:${config.APP_PORT}/img/movies_cover/${movie.image}`;

    db.query(
      "SELECT * FROM reviews WHERE movie_id = ?",
      [movieId],
      (err, reviews) => {
        if (err) {
          return res.status(500).json({ error: "Database query failed" });
        }
        movie.reviews = reviews;
        res.json({ movie });
      }
    );
  });
};

module.exports = {
  index,
  show,
};
