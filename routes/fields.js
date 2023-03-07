const express = require('express')
const verifyToken = require('../auth/verifyToken.js')
const fieldsController = require('../controllers/fieldsController.js')
const router = express.Router()

router.route('/')
  .get(fieldsController.getAllFields)
  .post(verifyToken,fieldsController.addField)

router.route('/:id')
  .get(fieldsController.getField)
  .patch(verifyToken,fieldsController.updateField)
  .delete(verifyToken,fieldsController.deleteField)


module.exports = router