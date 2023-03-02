require('dotenv').config()
const {PORT = 5000} = process.env

const app = require('./app.js')
const connectDatabase = require('./utilities/connectDatabase.js')

connectDatabase()
  .then(() => console.log("Database connection is successfull!"))
  .catch(err => console.log(err));

const server = app.listen(PORT, "0.0.0.0", () => console.log(`Listening on: http://localhost:${PORT}`))