function protectRoutes(req, res, next) {
  if(req.session?.userId) {
    next()
  } else {
    res.redirect('/login')
    // next(new Error('Giriş yapınız'))
  }
}

module.exports = protectRoutes