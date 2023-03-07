const express = require("express");
const multer = require("multer");
const storage = require("../utilities/multerStorage.js");
const imageController = require("../controllers/imageController.js");
const verifyToken = require("../auth/verifyToken.js");

const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(imageController.getAllImages)
  .post(verifyToken, upload.single("file"), imageController.addImage);

router
  .route("/:id")
  .get(imageController.getImage)
  .patch(verifyToken, upload.single("file"), imageController.updateImage)
  .delete(verifyToken, imageController.deleteImage);

module.exports = router;
