const express = require('express')
const mvpsController = require('../controllers/mvpsController.js')
const router = express.Router()

router.route('/')
  .get(mvpsController.getAllMVPs)
  .post(mvpsController.addMVP)

router.route('/featured').get(mvpsController.getFeaturedMVPs)

router.route('/:id')
  .get(mvpsController.getMVP)
  .patch(mvpsController.updateMVP)
  .delete(mvpsController.deleteMVP)


module.exports = router