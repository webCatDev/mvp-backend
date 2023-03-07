const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utilities/catchAsync.js");
const createError = require("../utilities/createError.js");
const { StatusCodes } = require("http-status-codes");

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user)
    return next(createError(StatusCodes.UNAUTHORIZED, "Bu e-posta kullanımda"));
  const hashedPassword = await bcrypt.hash(password, 12);

  await User.createUser({ name, email, password: hashedPassword });
  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "Kayıt başarılı" });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(createError("Böyle bir kullanıcı yok"));

  const isPwValid = await bcrypt.compare(password, user.password);
  if (!isPwValid) return next(createError("Giriş yapılamadı"));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(StatusCodes.OK).json({ token });
});
