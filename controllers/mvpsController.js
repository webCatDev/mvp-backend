const MVP = require("../models/mvp.js");
const Contribution = require("../models/contribution.js");
const catchAsync = require("../utilities/catchAsync.js");
const { StatusCodes } = require("http-status-codes");
const QueryBuilder = require("../utilities/QueryBuilder.js");

exports.getAllMVPs = catchAsync(async (req, res) => {
   const queryBuilder = new QueryBuilder(MVP);
   queryBuilder
     .search(req.query)
     .filter(req.query)
     .sort(req.query.sort)
     .paginate(req.query);

   const mvps = await queryBuilder.execute()

  res.status(StatusCodes.OK).json(mvps);
});

exports.getMVP = catchAsync(async (req, res) => {
  const mvp = await MVP.findById(req.params.id).populate({
    path: "contributions",
  });
  res.status(StatusCodes.OK).json(mvp);
});

exports.getFeaturedMVPs = catchAsync(async (req, res) => {
  const featured = await MVP.find({ isFeatured: true });
  res.status(StatusCodes.OK).json(featured);
});

exports.addMVP = catchAsync(async (req, res) => {
  const { fields, isFeatured, name, birthDeath, image, job } = req.body;

  await MVP.create({ fields, isFeatured, name, birthDeath, image, job });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "Kişi başarıyla eklendi!" });
});

exports.updateMVP = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { fields, isFeatured, name, birthDeath, image, job } = req.body;

  await MVP.findByIdAndUpdate(id, {
    fields,
    isFeatured,
    name,
    birthDeath,
    image,
    job,
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Kişi başarıyla güncellendi!" });
});

exports.deleteMVP = catchAsync(async (req, res) => {
  const { id } = req.params;
  await MVP.findByIdAndDelete(id);
  await Contribution.deleteMany({ mvp: id });
  
  res
    .status(StatusCodes.OK)
    .json({ state: "success", message: "Kişi başarıyla silindi!" });
});
