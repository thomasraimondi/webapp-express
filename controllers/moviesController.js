const db = require("../data/db");
const config = process.env;

const index = (req, res) => {
  db.query(
    "SELECT movies.*,avg(reviews.vote) AS avg_vote_movie, COUNT(reviews.id) AS n_reviewes FROM movies LEFT JOIN reviews ON movies.id = reviews.movie_id GROUP BY movies.id",
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      movies = results.map((movie) => {
        movie.image = `${config.APP_URL}:${config.APP_PORT}/img/movies_cover/${movie.image}`;
        return movie;
      });

      res.json({ movies });
    }
  );
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
      "SELECT * FROM reviews WHERE movie_id = ? ORDER BY created_at DESC",
      [movieId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database query failed" });
        }
        movie.reviews = results;
      }
    );

    db.query(
      "SELECT avg(vote) AS avg_vote_movie FROM reviews where movie_id= ? group by movie_id",
      [movieId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Database query failed" });
        }
        const avgVote = results.length > 0 ? results[0].avg_vote_movie : null;
        movie.avg_vote = parseFloat(avgVote);

        res.json({ movie });
      }
    );
  });
};

const store = (req, res) => {
  const { title, abstract, director, genre, release_year, image } = req.body;
  const { filename } = req.file;

  if (!title || !director) {
    return res.status(400).json({ error: "bad request" });
  }
  const values = [
    title,
    director,
    abstract ?? null,
    genre ?? null,
    release_year ?? null,
    filename,
  ];

  console.log(values);

  db.query(
    "INSERT INTO movies (title, director, abstract, genre, release_year, image) VALUES (?, ?, ?, ?, ?, ?)",
    values,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed", err });
      }
      res.status(201).json({ id: results.insertId, values });
    }
  );
};

const update = (req, res) => {
  const movieId = req.params.id;
  const { title, abstract, description, director, genre, release_year, image } =
    req.body;

  if (!title || !director) {
    return res.status(400).json({ error: "bad request" });
  }

  const values = [
    title,
    director,
    abstract ?? null,
    genre ?? null,
    release_year ?? null,
    image ?? null,
    movieId,
  ];

  db.query(
    "UPDATE movies SET title = ?, director = ?, abstract = ?, genre = ?, release_year = ?, image = ? WHERE id = ?",
    values,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res
        .status(200)
        .json({ message: "Movie updated successfully", id: movieId, values });
    }
  );
};

const destroy = (req, res) => {
  const movieId = req.params.id;

  db.query("DELETE FROM movies WHERE id = ?", [movieId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.status(204).json({ message: "Movie deleted successfully" });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
