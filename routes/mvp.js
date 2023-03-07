const express = require("express");
const verifyToken = require("../auth/verifyToken.js");
const mvpsController = require("../controllers/mvpsController.js");
const router = express.Router();

router
  .route("/")
  .get(mvpsController.getAllMVPs)
  .post(verifyToken, mvpsController.addMVP);

router.route("/featured").get(mvpsController.getFeaturedMVPs);

router
  .route("/:id")
  .get(mvpsController.getMVP)
  .patch(verifyToken, mvpsController.updateMVP)
  .delete(verifyToken, mvpsController.deleteMVP);

module.exports = router;
