// backend/helpers/responseHelpers.js
export const sendSuccess = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
      success: true,
      message,
      data,
  });
};

export const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ // Corrected line
      success: false,
      message,
  });
};