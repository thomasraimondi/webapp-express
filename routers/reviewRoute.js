const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.get("/", reviewsController.index);
router.post("/", reviewsController.store);

module.exports = router;
