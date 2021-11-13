export const Format = {
  error: (statusCode, message, data) => ({
    statusCode,
    data: data || null,
    message,
  }),
  success: (data, message) => ({
    statusCode: 200,
    data: data || null,
    message: message || 'OK',
  }),
  noContent: (data, message) => ({
    statusCode: 204,
    data: data || null,
    message: message || 'No Content Found',
  }),
  badRequest: (data, message) => ({
    statusCode: 400,
    data: data || null,
    message: message || 'Bad Request',
  }),
  unAuthorized: (data, message) => ({
    statusCode: 401,
    data: data || null,
    message: message || 'Unauthorized',
  }),
  notFound: (data, message) => ({
    statusCode: 404,
    data: data || null,
    message: message || 'Not found',
  }),
  forbidden: (data, message) => ({
    statusCode: 403,
    data: data || null,
    message: message || 'Forbidden',
  }),
  conflict: (data, message) => ({
    statusCode: 409,
    data: data || null,
    message: message || 'Conflict',
  }),
  internalError: (error, message) => ({
    statusCode: 500,
    data: null,
    error: `${error}`,
    message: message || 'Internal Server Error',
  }),
  generateErrorObject: (param, message, location) => ({
    param,
    message,
    location,
  }),
};

export default { Format };
