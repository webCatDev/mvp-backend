const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema({
  name:  String,
})

const Field = mongoose.model('Field', fieldSchema)
module.exports = Field