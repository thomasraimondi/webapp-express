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

module.exports = {
  index,
};
