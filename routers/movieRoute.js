const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", (req, res) => {
  moviesController.index(req, res);
});

router.get("/:id", (req, res) => {
  moviesController.show(req, res);
});

module.exports = router;
