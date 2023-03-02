const express = require("express")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()

// ROUTES
const rootRouter = require('./routes/root.js')
const authRouter = require('./routes/auth.js')
const mvpRouter = require('./routes/mvp.js')
const imagesRouter = require('./routes/images.js')
const fieldsRouter = require('./routes/fields.js')
const contributionsRouter = require('./routes/contributions.js')


// MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

// ROUTE MIDDLEWARES
app.use("/", rootRouter)
app.use("/auth", authRouter)
app.use('/images', imagesRouter)
app.use('/fields', fieldsRouter)
app.use('/mvps', mvpRouter)
app.use('/contributions', contributionsRouter)

module.exports = app