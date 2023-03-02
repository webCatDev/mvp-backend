const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  url:  String,
  alt: String
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image