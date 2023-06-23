const errorsMessage = {
  401:"Unauthorized",
  403:"Forbiden",
  404:"Not found",
  409:"Conflict",
}

const HttpError = (status, message=errorsMessage[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError