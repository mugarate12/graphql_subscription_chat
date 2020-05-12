const bcrypt = require('bcryptjs')
const { handleError, throwError } = require('./../../../utils/utils')
const { verifyToken, validateToken } = require('./../../../middlewares/verifyToken')
const { graphqlFields } = require('./../../../utils/graphqlUtils')
const createToken = require('./../../../utils/createToken')
const USERTABLENAME = 'users'

module.exports = {
  loginUser: async (parent, { username, password }, { connection }, info) => {
    return await connection(USERTABLENAME)
      .select('*')
      .where({
        username
      })
      .first()
      .then(async user => {
        const isValidPassword = await bcrypt.compare(password, user.password)
        throwError(!isValidPassword, "usuário inválido, por favor verificar informações")

        const token = createToken(user)
        return { token }
      })
      .catch(handleError)
  },
  searchUser: async (parent, { username }, { connection, authToken }, info) => {
    const fields = graphqlFields(info)

    const authUser = await verifyToken(authToken)
    validateToken(authUser)

    return await connection(USERTABLENAME)
      .select('*')
      .where({
        username
      })
      .first()
      .then(user => user)
      .catch(handleError)
  }
}
