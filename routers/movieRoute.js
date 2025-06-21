const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");
const upload = require("../middlewares/multer");
const postMovieValidation = require("../middlewares/Validation/postMovieValidation");

router.get("/", moviesController.index);
router.get("/:id", moviesController.show);
router.post(
  "/",
  upload.single("image"),
  postMovieValidation,
  moviesController.store
);
router.put("/:id", moviesController.update);
router.delete("/:id", moviesController.destroy);

module.exports = router;
