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

  if (!movie_id || !name || !vote) {
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

module.exports = {
  index,
  store,
};
