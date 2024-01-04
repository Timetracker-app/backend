function prepareResponse(message, code) {
  const response = {
    status: code,
    error: message,
  };
  return response;
}

function generateURL(address) {
  var url;

  if (window.location.protocol === "https:") {
    url = "https";
  } else {
    url = "http";
  }

  url += "://" + window.location.host + window.location.pathname + address;

  return url;
}

module.exports = {
  prepareResponse,
  generateURL,
};
