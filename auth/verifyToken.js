const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const createError = require("../utilities/createError");

function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return next(createError(StatusCodes.UNAUTHORIZED, "Lütfen giriş yapınız"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
