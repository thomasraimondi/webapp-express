const postReviewValidation = (req, res, next) => {
  const { movie_id, name, vote, text } = req.body; // destructure body of request

  const malformatElements = [];

  if (!name || typeof name !== "string" || name.length < 3) {
    malformatElements.push("name");
  }
  if (!text || typeof text !== "string" || text.length < 3) {
    malformatElements.push("text");
  }
  if (!movie_id || typeof movie_id !== "number" || movie_id < 0) {
    malformatElements.push("movie_id");
  }
  if (!vote || typeof vote !== "number" || vote < 1 || vote > 5) {
    malformatElements.push("vote");
  }

  if (malformatElements.length) {
    const error = new Error("element malformat");
    error.statusCode = 400;
    error.data = { malformatElements };
    throw error;
  } else {
    next();
  }
};

module.exports = postReviewValidation;
