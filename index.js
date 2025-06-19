const express = require("express");
require("dotenv").config();
const { notFount, errorHandler } = require("./middlewares/errorHandler");
const movieRoute = require("./routers/movieRoute");
const reviewRoute = require("./routers/reviewRoute");
const cors = require("cors");

const app = express();
const config = process.env;
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.static("public"));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/movies", movieRoute);
app.use("/reviews", reviewRoute);

app.use(notFount);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(
    `Server is running on ${config.APP_URL}:${config.APP_PORT || 3000}`
  );
});
