function prepareResponse(message, code) {
  const response = {
    status: code,
    error: message,
  };
  return response;
}

module.exports = {
  prepareResponse,
};
