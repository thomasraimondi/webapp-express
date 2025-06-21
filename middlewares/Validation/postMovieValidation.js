const {
  validateString,
  validateNumber,
  validateFileFormat,
} = require("../../utils/validation");

const postMovieValidation = (req, res, next) => {
  console.log(req.file);

  const { title, abstract, director, genre, release_year } = req.body;
  if (req.file) {
    const { filename, mimetype } = req.file;
  }

  const malformatElements = {};

  const d = new Date();
  let currentYear = d.getFullYear();

  /**
   * malformedElements = {
   *    title: [
   *        "",
   *        ""
   *    ]
   * }
   */

  const validateTitle = validateString("title", title, 3);

  if (validateTitle === "not value") {
    malformatElements.title = [{ message: "il campo è obbligtorio" }];
  } else if (validateTitle === "error format") {
    malformatElements.title = [{ message: "il valore non è testuale" }];
  } else if (validateTitle === "error length") {
    malformatElements.title = [
      { message: "la lunghezza deve essere maggiore di 3" },
    ];
  }

  const validateAbstract = validateString("abstract", abstract, 3);

  if (validateAbstract === "not value") {
    malformatElements.abstract = [{ message: "il campo è obbligtorio" }];
  } else if (validateAbstract === "error format") {
    malformatElements.abstract = [{ message: "il valore non è testuale" }];
  } else if (validateAbstract === "error length") {
    malformatElements.abstract = [
      { message: "la lunghezza deve essere maggiore di 3" },
    ];
  }

  const validateDirector = validateString("director", director, 3);

  if (validateDirector === "not value") {
    malformatElements.director = [{ message: "il campo è obbligtorio" }];
  } else if (validateDirector === "error format") {
    malformatElements.director = [{ message: "il valore non è testuale" }];
  } else if (validateDirector === "error length") {
    malformatElements.director = [
      { message: "la lunghezza deve essere maggiore di 3" },
    ];
  }

  const validateGenre = validateString("genre", genre, 3);

  if (validateGenre === "not value") {
    malformatElements.genre = [{ message: "il campo è obbligtorio" }];
  } else if (validateGenre === "error format") {
    malformatElements.genre = [{ message: "il valore non è testuale" }];
  } else if (validateGenre === "error length") {
    malformatElements.genre = [
      { message: "la lunghezza deve essere maggiore di 3" },
    ];
  }

  const validateRelease_year = validateNumber(
    "release_year",
    release_year,
    1900,
    currentYear
  );

  if (validateRelease_year === "not value") {
    malformatElements.release_year = [{ message: "il campo è obbligtorio" }];
  }
  //   isNaN(Number(value)) === false ||
  else if (validateRelease_year === "under min") {
    malformatElements.release_year = [
      { message: `Release Year deve essere maggiore del 1900` },
    ];
  } else if (validateRelease_year === "uppare max") {
    malformatElements.release_year = [
      { message: `Release Year deve essere minore del ${currentYear}` },
    ];
  }

  if (req.file) {
    const validateImage = validateFileFormat("image", req.file.mimetype);
    if (validateImage === "not jpg") {
      malformatElements.image = [
        { message: `si possono caricare solo formati JPG` },
      ];
    }
  } else {
    malformatElements.image = [{ message: "il campo è obbligtorio" }];
  }

  console.log(malformatElements);

  if (malformatElements) {
    const error = new Error("element malformat");
    error.statusCode = 400;
    error.data = { malformatElements };
    throw error;
  } else {
    next();
  }
};

module.exports = postMovieValidation;
