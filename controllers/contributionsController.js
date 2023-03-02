const MVP = require('../models/mvp.js')
const Contribution = require('../models/contribution.js')

exports.getAllContributions = async (req, res) => {
  const contributions = await Contribution.find().populate({path: 'mvp'})
  res.json(contributions)
}

exports.getContribution = async (req, res) => {
  const contribution = await Contribution.findById(req.params.id).populate({path: 'mvp'})
  res.json(contribution)
}

exports.addContribution = async (req, res) => {
  const {mvp, field, date, topic, description} = req.body
  const contribution = await Contribution.create({mvp, field, date, topic, description})
  await MVP.findOneAndUpdate(mvp, {$push: {contributions: contribution._id}})
  res.json({status: 'success', message: 'Katkı başarıyla eklendi!'})
}

exports.updateContribution = async (req, res) => {
  const { id } = req.params
  const {mvp, field, date, topic, description} = req.body
  const updatedCon = await Contribution.findByIdAndUpdate(id , {mvp, field, date, topic, description}, {new: true})
  res.json({status: 'success', message: 'Katkı başarıyla güncellendi!', data: updatedCon})
}

exports.deleteContribution = async (req, res) => {
  const { id } = req.params
  await Contribution.findByIdAndDelete(id)
  res.json({status: 'success', message: 'Katkı başarıyla silindi!'})
}