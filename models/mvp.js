const mongoose = require('mongoose')

const mvpSchema = new mongoose.Schema({
  name: String,
  birthDeath: String,
  isFeatured: Boolean,
  image: String,
  job: String,
  fields: [String],
  contributions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution'
  }]
})

const MVP = mongoose.model('MVP', mvpSchema)
module.exports = MVP