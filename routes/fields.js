const express = require('express')
const fieldsController = require('../controllers/fieldsController.js')
const router = express.Router()

router.route('/')
  .get(fieldsController.getAllFields)
  .post(fieldsController.addField)

router.route('/:id')
  .get(fieldsController.getField)
  .patch(fieldsController.updateField)
  .delete(fieldsController.deleteField)


module.exports = router