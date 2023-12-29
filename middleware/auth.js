const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userName: payload.userName,
        userLastname: payload.userLastname,
      };
      next();
    } else {
      res.status(401).json("Authentication invalid");
    }
  } catch (error) {
    res.status(401).json("Authentication invalid");
  }
};

module.exports = auth;
