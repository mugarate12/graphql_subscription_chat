const { MESSAGE_ADDED } = require('./types')
const pubsub = require('./../../../pubsub')

module.exports = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterator(MESSAGE_ADDED)
  }
}
