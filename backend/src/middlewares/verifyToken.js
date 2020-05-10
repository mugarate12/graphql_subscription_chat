const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const { throwError } = require('./../utils/utils')
const JWT_SECRET = process.env.NODE_ENV

const verifyToken = async (authToken) => {
  if(!authToken) {
    return { error: 'token não fornecido' }
  }

  const [scheme, token] = authToken.split(' ')
  try {
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET)

    let authUser = {}
    authUser.userID = decoded.id
    authUser.username = decoded.username
    
    return authUser
  } catch (error) {
    return { error: 'token inválido' }
  }
}

const validateToken = (authUser) => {
  throwError(!!authUser.error, authUser.error)
}

module.exports = {
  verifyToken,
  validateToken
}
