const express = require("express");
require("dotenv").config();
const { notFount, errorHandler } = require("./middlewares/errorHandler");
const movieRoute = require("./routers/movieRoute");

const app = express();
const config = process.env;

app.use(express.static("public"));
app.use(express.json());

app.use("/movies", movieRoute);

app.use(notFount);
app.use(errorHandler);

app.listen(3000, () => {
  console.log(
    `Server is running on ${config.APP_URL}:${config.APP_PORT || 3000}`
  );
});
