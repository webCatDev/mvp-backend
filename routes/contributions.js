const express = require("express");
const verifyToken = require("../auth/verifyToken.js");
const contributionsController = require("../controllers/contributionsController.js");
const router = express.Router();

router
  .route("/")
  .get(contributionsController.getAllContributions)
  .post(verifyToken, contributionsController.addContribution);

router
  .route("/:id")
  .get(contributionsController.getContribution)
  .patch(verifyToken, contributionsController.updateContribution)
  .delete(verifyToken, contributionsController.deleteContribution);

module.exports = router;
