const db = require("../data/db");
const config = process.env;

const index = (req, res) => {
  db.query(`SELECT * FROM reviews`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json({ results });
  });
};

const store = (req, res) => {
  const { movie_id, name, vote, text } = req.body;

  if (!movie_id || !name || !vote || vote < 1 || vote > 5) {
    return res.status(400).json({ error: "bad request" });
  }

  const values = [movie_id, name, vote, text ?? null];

  db.query(
    `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`,
    values,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.status(201).json({
        message: "Review created successfully",
        id: results.insertId,
        values: {
          movie_id,
          name,
          vote,
          text: text ?? null,
        },
      });
    }
  );
};

const update = (req, res) => {
  const reviewId = req.params.id;
  const { vote, text } = req.body;

  if (!vote) {
    return res.status(400).json({ error: "bad request" });
  }

  const values = [vote, text ?? null, reviewId];

  db.query(
    `UPDATE reviews SET vote = ?, text = ? WHERE id = ?`,
    values,
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json({
        message: "Review updated successfully",
        id: reviewId,
        values: {
          vote,
          text: text ?? null,
        },
      });
    }
  );
};

const destroy = (req, res) => {
  const reviewId = req.params.id;

  db.query(`DELETE FROM reviews WHERE id = ?`, [reviewId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query failed" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Review not found" });
    }
    res
      .status(204)
      .json({ message: "Review deleted successfully", id: reviewId });
  });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
