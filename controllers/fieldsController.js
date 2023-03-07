const { StatusCodes } = require("http-status-codes");
const Field = require("../models/field.js");
const catchAsync = require("../utilities/catchAsync.js");
const createError = require("../utilities/createError.js");
const QueryBuilder = require("../utilities/QueryBuilder.js");

exports.getAllFields = catchAsync(async (req, res) => {
   const queryBuilder = new QueryBuilder(Field);
   queryBuilder
     .search(req.query)
     .filter(req.query)
     .sort(req.query.sort)
     .paginate(req.query);

   const fields = await queryBuilder.execute()

  res.status(StatusCodes.OK).json(fields);
});

exports.getField = catchAsync(async (req, res, next) => {
  const field = await Field.findById(req.params.id);
  if(!field) return next(createError(StatusCodes.NOT_FOUND, 'Böyle bir alan yok'))
  res.status(StatusCodes.OK).json(field);
});

exports.addField = catchAsync(async (req, res) => {
  const { name } = req.body;

  await Field.create({ name });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Alan başarılı bir şekilde eklendi",
  });
});

exports.updateField = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await Field.findByIdAndUpdate(id, { name }, { new: true });
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Alan başarılı bir şekilde güncellendi",
  });
});

exports.deleteField = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Field.findByIdAndDelete(id);
  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Alan başarıyla silindi!" });
});
