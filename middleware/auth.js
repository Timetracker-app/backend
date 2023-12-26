const jwt = require("jsonwebtoken");
//const CustomAPIError = require("../errors/custom");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json("Authentication invalid");
    //throw CustomAPIError;
    //throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userName: payload.userName,
      userLastname: payload.userLastname,
    };
    next();
  } catch (error) {
    res.status(401).json("Authentication invalid");
    //throw CustomAPIError;
    //throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
