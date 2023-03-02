const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.find({ email })
  if (user) return next(new Error('Bu email kullanımda'))
  const hashedPassword = await bcrypt.hash(password, 12)

  await User.createUser({ name, email, password: hashedPassword })
  res.json({ status: "success", message: "Kayıt başarılı" });
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new Error("Böyle bir kullanıcı yok"));

  console.log(password, user.password);
  const isPwValid = await bcrypt.compare(password, user.password);
  if (!isPwValid) return next(new Error("Giriş yapılamadı"));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};