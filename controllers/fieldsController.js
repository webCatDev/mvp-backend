const Field = require("../models/field.js");

exports.getAllFields = async (req, res) => {
  const fields = await Field.find();
  res.json(fields);
};

exports.getField = async (req, res) => {
  const field = await Field.findById(req.params.id);
  res.json(field);
};

exports.addField = async (req, res) => {
  const { name } = req.body;

  await Field.create({ name });
  res.json({
    status: "success",
    message: "Alan başarılı bir şekilde eklendi",
  });
};

exports.updateField = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Field.findByIdAndUpdate(id, { name }, { new: true });
  res.json({
    status: "success",
    message: "Alan başarılı bir şekilde güncellendi",
  });
};

exports.deleteField = async (req, res) => {
  const { id } = req.params;
  await Field.findByIdAndDelete(id);
  res.json({ status: "success", message: "Alan başarıyla silindi!" });
};
