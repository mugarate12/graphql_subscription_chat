const pubsub = require('./../../../pubsub')
const { validateToken, verifyToken } = require('./../../../middlewares/verifyToken')
const { handleError, throwError } = require('./../../../utils/utils')
const { MESSAGE_ADDED } = require('./../Subscription/types')

const MESSAGE_TABLE_NAME = 'messages'
const USER_TABLE_NAME = 'users'

module.exports = {
  addMessage: async (parent, { content, toUser }, { connection, authToken }, info) => {    
    const authUser = await verifyToken(authToken)
    validateToken(authUser)

    const user = await connection(USER_TABLE_NAME)
      .select('id')
      .where({
        username: toUser
      })
      .first()
    
    throwError(!user, "usuário a quem o envio da mensagem foi destinado não encontrado")

    return await connection(MESSAGE_TABLE_NAME)
      .insert({
        content,
        authorFK: authUser.userID,
        contactFK: user.id
      })
      .then(messageID => {
        // essa call pro pubsub é provisoria
        pubsub.publish(MESSAGE_ADDED, {
          messageAdded: {
            id: messageID,
            content,
            author: {
              id: authUser.userID,
              username: authUser.username,
              name:authUser.name
            }
          }
        })

        return true
      })
      .catch(handleError)
  }
}
