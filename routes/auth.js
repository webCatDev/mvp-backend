const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.get("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

module.exports = router;
