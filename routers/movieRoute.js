const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.index);
router.get("/:id", moviesController.show);
router.post("/", moviesController.store);
router.put("/:id", moviesController.update);
router.delete("/:id", moviesController.destroy);

module.exports = router;
