const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const JWT_SECRET = process.env.NODE_ENV

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    return res.status(401).json({error: 'token not provided'})
  }

  const [scheme, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET)

    req.userId = decoded.id
    req.username = decoded.username
    return next()
  } catch (error) {
    return res.status(401).json({error: 'token invalid'})
  }
}
