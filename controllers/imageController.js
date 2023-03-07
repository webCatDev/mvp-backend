const fs = require("fs/promises");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const Image = require("../models/image.js");
const catchAsync = require("../utilities/catchAsync.js");
const QueryBuilder = require("../utilities/QueryBuilder.js");

exports.getAllImages = catchAsync(async (req, res) => {
   const queryBuilder = new QueryBuilder(Image);
   queryBuilder
     .search(req.query)
     .filter(req.query)
     .sort(req.query.sort)
     .paginate(req.query);

   const allImages = await queryBuilder.execute()

  res.status(StatusCodes.OK).json(allImages);
});

exports.getImage = catchAsync(async (req, res) => {
  const image = await Image.findById(req.params.id);
  res.status(StatusCodes.OK).json(image);
});

exports.addImage = catchAsync(async (req, res) => {
  if (!req.filename) throw new Error("Image upload failed");

  await Image.create({
    url: req.filename,
    alt: req.body.alt,
  });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Resim başarıyla eklendi!",
  });
});

exports.updateImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  await fs.unlink(path.join(process.cwd(), "public", "uploads", image.url));
  await Image.findByIdAndUpdate(
    id,
    {
      url: req.filename,
      alt: req.body.alt,
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    state: "success",
    message: "Resim başarıyla güncellendi!",
  });
});

exports.deleteImage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);
  await fs.unlink(path.join(process.cwd(), "public", "uploads", image.url));
  await Image.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({
    state: "success",
    message: "Resim başarıyla silindi!",
  });
});
