const express = require("express");
require("dotenv").config();
const { notFount, errorHandler } = require("./middlewares/errorHandler");
const db = require("./data/db");

const app = express();
const config = process.env;

app.get("/", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json({ results });
  });
});

app.get("/:id", (req, res) => {
  const movieId = req.params.id;
  db.query("SELECT * FROM movies WHERE id = ?", [movieId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const movie = results[0];
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
});

app.use(notFount);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(
    `Server is running on ${config.APP_URL}:${config.APP_PORT || 3000}`
  );
});
