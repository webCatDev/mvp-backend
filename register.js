const bcrypt = require('bcrypt')
const uuid = require('uuid')
const User = require('./models/user.js')
const connectDatabase = require('./utilities/connectDatabase')

const [, , name, email, password] = process.argv

const register = async () => {
  try {
    const user = await User.find({ email })
    console.log(user)
    if (user.length) throw new Error('Bu email kullanımda')
    const hashedPassword = await bcrypt.hash(password, 12)

    const sessionId = uuid.v4();
    await User.create({ name, email, password: hashedPassword, sessionId })
  } catch (err) {
    console.log(err)
  } finally {
    process.exit(1)
  }
}

connectDatabase().then(() => {
  console.log('Connected')
  register()
}).catch(err => {
  console.log(err)
  process.exit(1)
})