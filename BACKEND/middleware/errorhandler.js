const constants = require("../constants");

const errorHandler = (err, req, res, next) => {
  const status1 = res.statusCode;



  switch (status1) {
    case constants.NOT_FOUND:
      res.json({ title: "Not found", message: err.message, StackTrace: err.stack });
      break;
    case constants.VALIDATION_ERR:
      res.json({ title: "Validation error", message: err.message, StackTrace: err.stack });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, StackTrace: err.stack });
      break;
    case constants.SERVER_ERR:
      res.json({ title: "Server error", message: err.message, StackTrace: err.stack });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "Unauthorized error", message: err.message, StackTrace: err.stack });
      break;
    default:
      res.json({message:"no errors"});
      break;
  }
};

module.exports = errorHandler;
