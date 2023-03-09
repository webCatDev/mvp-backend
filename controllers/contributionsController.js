const MVP = require("../models/mvp.js");
const Contribution = require("../models/contribution.js");
const catchAsync = require("../utilities/catchAsync.js");
const { StatusCodes } = require("http-status-codes");
const QueryBuilder = require("../utilities/QueryBuilder.js");

exports.getAllContributions = catchAsync(async (req, res) => {
  const queryBuilder = new QueryBuilder(Contribution);
  queryBuilder
    .search(req.query)
    .filter(req.query)
    .sort(req.query.sort)
    .paginate(req.query);

  const contributions = await queryBuilder.execute({populate: { path: "mvp" }});

  res.status(StatusCodes.OK).json(contributions);
});

exports.getContribution = catchAsync(async (req, res) => {
  const contribution = await Contribution.findById(req.params.id).populate({
    path: "mvp",
  });
  res.status(StatusCodes.OK).json(contribution);
});

exports.addContribution = catchAsync(async (req, res) => {
  const { mvp, field, date, topic, description } = req.body;
  const contribution = await Contribution.create({
    mvp,
    field,
    date,
    topic,
    description,
  });

  await MVP.findOneAndUpdate(mvp, {
    $push: { contributions: contribution._id },
  });

  res
    .status(StatusCodes.CREATED)
    .json({ status: "success", message: "Katkı başarıyla eklendi!" });
});

exports.updateContribution = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { mvp, field, date, topic, description } = req.body;
  
  const updatedCon = await Contribution.findByIdAndUpdate(
    id,
    { mvp, field, date, topic, description },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Katkı başarıyla güncellendi!",
    data: updatedCon,
  });

});

exports.deleteContribution = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Contribution.findByIdAndDelete(id);
  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Katkı başarıyla silindi!" });
});
