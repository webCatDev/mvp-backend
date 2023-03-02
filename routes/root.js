const express = require("express");
const getHomepage = require("../controllers/rootController.js");
const router = express.Router();

router.route("/").get(getHomepage);

module.exports = router;
