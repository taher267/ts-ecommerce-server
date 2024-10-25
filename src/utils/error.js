export const notFound = (msg = "Resource not found") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};

export const badRequest = (msg = "Bad Request") => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};

export const serverError = (msg = "Internal Server Error") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};

export const authenticationError = (msg = "Authentication Failed") => {
  const error = new Error(msg);
  error.status = 401;
  return error;
};

export const authorizationError = (msg = "Permission Denied") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

export const customError = ({
  message = "Bad request",
  status = 400,
  errors,
}) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
};
export const onlyError = ({ message = "Something Went Wrong" }) => {
  const error = new Error(message);
  // error.status = status;
  // error.errors = errors;
  return error;
};

export const rateLimitError = (
  msg = "Too many requests, please try again later."
) => {
  const error = new Error(msg);
  error.status = 429;
  return error;
};
