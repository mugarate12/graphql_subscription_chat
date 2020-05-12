const { validateToken, verifyToken } = require('./../../../middlewares/verifyToken')
const { handleError, throwError } = require('./../../../utils/utils')
const { graphqlFields } = require('./../../../utils/graphqlUtils')

const MESSAGE_TABLE_NAME = 'messages'
const USER_TABLE_NAME = 'users'

module.exports = {
  conversation: async (parent, { contactUsername }, { connection, authToken }, info) => {
    const authUser = await verifyToken(authToken)
    validateToken(authUser)

    let fiels = graphqlFields(info)
    fiels = fiels.filter(field => field !== 'author')

    const contact = await connection(USER_TABLE_NAME)
      .select('id')
      .where({
        username: contactUsername
      })
      .first()

    throwError(!contact, "contato não encontrado, por favor, verificar informações")

    return await connection(MESSAGE_TABLE_NAME)
      .select([...fiels, 'authorFK'])
      .where({
        authorFK: authUser.userID,
        contactFK: contact.id
      })
      .then(messages => messages)
      .catch(handleError)
  }
}