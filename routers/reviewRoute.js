const express = require("express");
const router = express.Router();
const reviewsController = require("../controllers/reviewsController");
const postReviewValidation = require("../middlewares/Validation/postReviewValidation");

router.get("/", reviewsController.index);
router.post("/", postReviewValidation, reviewsController.store);
router.put("/:id", reviewsController.update);
router.delete("/:id", reviewsController.destroy);

module.exports = router;
