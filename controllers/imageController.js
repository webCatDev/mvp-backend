const fs = require('fs/promises')
const path = require('path')
const Image = require('../models/image.js')


exports.getAllImages = async (req, res) => {
  const allImages = await Image.find()
  res.json(allImages)
}

exports.getImage = async (req, res) => {
  const image = await Image.findById(req.params.id)
  res.json(image)
}

exports.addImage = async (req, res) => {

  if (!req.filename) throw new Error('Image upload failed')

  await Image.create({
    url: req.filename,
    alt: req.body.alt
  })

  res.json({
    status: 'success',
    message: 'Resim başarıyla eklendi!'
  })
}

exports.updateImage = async (req, res) => {
  const { id } = req.params
  const image = await Image.findById(id)
  await fs.unlink(path.join(process.cwd(), 'public', 'uploads', image.url))
  await Image.findByIdAndUpdate(id, {
    url: req.filename,
    alt: req.body.alt
  }, { new: true })

  res.json({
    state: 'success',
    message: 'Resim başarıyla güncellendi!',
  })
}

exports.deleteImage = async (req, res) => {
  const { id } = req.params
  const image = await Image.findById(id)
  await fs.unlink(path.join(process.cwd(), 'public', 'uploads', image.url))
  await Image.findByIdAndDelete(id)
  res.json({
    state: 'success',
    message: 'Resim başarıyla silindi!',
  })
}