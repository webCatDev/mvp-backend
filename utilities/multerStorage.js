const path = require('path')
const multer = require('multer')
const mongoose = require('mongoose')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(process.cwd(),'public', 'uploads'))
  },
  filename: async function(req, file, cb) {
    console.log(file.originalname)
        const filename = new mongoose.Types.ObjectId().toString() + path.extname(file.originalname)
    
      
    cb(null, filename)
    req.filename = filename
  }
})

module.exports = storage