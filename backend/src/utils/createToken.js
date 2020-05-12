const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.NODE_ENV

module.exports = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username,
    name: user.name
  }, JWT_SECRET, {})
}
