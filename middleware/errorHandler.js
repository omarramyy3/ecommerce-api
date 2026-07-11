const AppError = require('../utils/AppError');

module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went completely wrong on our end.';
  
  let status = err.status || (statusCode.toString().startsWith('4') ? 'fail' : 'error');

  if (err.name === 'CastError') {
    message = `Resource not found with invalid ID format: ${err.value}`;
    statusCode = 400;
    status = 'fail';
  }

  if (err.code === 11000) {
    const fieldName = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate field value entered. The specified ${fieldName} already exists.`;
    statusCode = 409;
    status = 'fail';
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
    status = 'fail';
  }

  res.status(statusCode).json({
    status,
    message
  });
};