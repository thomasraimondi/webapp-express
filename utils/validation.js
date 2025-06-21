const validateString = (field, value, length) => {
  if (!value) {
    return "not value";
  } else if (typeof value !== "string") {
    return "error format";
  } else if (value.length < length) {
    return "error length";
  }
  return true;
};

//   const validateStringUppercase = (field, value) => {
//     validateString(field, value);
//     value
//   }

const validateNumber = (field, value, min, max) => {
  if (!value) {
    return "not value";
  }
  //   isNaN(Number(value)) === false ||
  else if (value < min) {
    return "under min";
  } else if (value > max) {
    return "uppare max";
  }
};

const validateFileFormat = (field, format) => {
  if (format !== "image/jpeg") {
    return "not jpg";
  }
};

//   const validateStringUppercase = (field, value) => {
//     validateString(field, value);
//     value
//   }

module.exports = { validateString, validateNumber, validateFileFormat };
