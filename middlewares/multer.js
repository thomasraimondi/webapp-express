const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/img/movies_cover",
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
