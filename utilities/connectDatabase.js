const mongoose = require('mongoose')
const DB_PASSWORD = "rl0AjTvXGAJ0dZ9e"

async function connectDatabase() {
  mongoose.set('strictQuery', true)
  await mongoose.connect(`mongodb+srv://webcatdev:${DB_PASSWORD}@cluster0.1tnlzhn.mongodb.net/scientists?retryWrites=true&w=majority`);
}

module.exports = connectDatabase
