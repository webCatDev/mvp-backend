const MVP = require("../models/mvp.js");
const Contribution = require("../models/contribution.js");

exports.getAllMVPs = async (req, res) => {
  const mvps = await MVP.find();
  res.json(mvps);
};

exports.getMVP = async (req, res) => {
  const mvp = await MVP.findById(req.params.id).populate({
    path: "contributions",
  });
  res.json(mvp);
};

exports.getFeaturedMVPs = async (req, res) => {
  const featured = await MVP.find({ isFeatured: true });
  res.json(featured);
};

exports.addMVP = async (req, res) => {
  const { fields, isFeatured, name, birthDeath, image, job } = req.body;

  await MVP.create({ fields, isFeatured, name, birthDeath, image, job });

  res.json({ status: "success", message: "Kişi başarıyla eklendi!" });
};

exports.updateMVP = async (req, res) => {
  const { id } = req.params;
  const { fields, isFeatured, name, birthDeath, image, job } = req.body
  
   await MVP.findByIdAndUpdate(id, {
    fields,
    isFeatured,
    name,
    birthDeath,
    image,
    job,
  });
  res.json({ status: "success", message: "Kişi başarıyla güncellendi!" });
};

exports.deleteMVP = async (req, res) => {
  const { id } = req.params;
  await MVP.findByIdAndDelete(id);
  await Contribution.deleteMany({ mvp: id });
  res.json({ state: "success", message: "Kişi başarıyla silindi!" });
};
