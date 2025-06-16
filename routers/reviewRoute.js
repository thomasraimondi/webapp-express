const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");

router.get("/", reviewsController.index);
router.post("/", reviewsController.store);
router.put("/:id", reviewsController.update);
router.delete("/:id", reviewsController.destroy);

module.exports = router;
