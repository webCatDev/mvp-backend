const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.log(err)
    // Check if the error is an instance of mongoose error and send appropriate response
    if (err instanceof Error.ValidationError) {
      return res.status(400).send({ error: err.message });
    }

    // Check if the error is a 404 not found error
    if (err instanceof Error.DocumentNotFoundError) {
      return res.status(404).send({ error: "Resource not found" });
    }

    // Handle other errors
    return res.status(500).send({ error: "Something went wrong" });
  });

module.exports = catchAsync;
