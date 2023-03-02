const express = require('express')
const contributionsController = require('../controllers/contributionsController.js')
const router = express.Router()

router.route('/')
  .get(contributionsController.getAllContributions)
  .post(contributionsController.addContribution)

router.route('/:id')
  .get(contributionsController.getContribution)
  .patch(contributionsController.updateContribution)
  .delete(contributionsController.deleteContribution)

module.exports = router