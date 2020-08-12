const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //accessing the token from the header
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "Access denied, no token provided" });
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid!" });
  }
};
