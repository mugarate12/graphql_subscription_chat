const { withFilter } = require('apollo-server')
const pubsub = require('./../../../pubsub')
const { MESSAGE_ADDED } = require('./types')

module.exports = {
  messageAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterator(MESSAGE_ADDED),  
      (payload, variables) => {
        // aqui eu ponho a condição sobre a qual eu retorno ou não a mensagem
        return variables.contact === payload.messageAdded.contactUsername
      }
    )
  }
}
