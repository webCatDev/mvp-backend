const { StatusCodes } = require('http-status-codes');
const path = require('path')

function getHomepage(req, res) {
    res
      .status(StatusCodes.OK)
      .sendFile(path.join(__dirname, "..", "views", "index.html"));
}

module.exports = getHomepage