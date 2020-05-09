const pubsub = require('./../../../pubsub')
const { MESSAGE_ADDED } = require('./../Subscription/types')

module.exports = {
  addMessage: (parent, args, context, info) => {

    pubsub.publish(MESSAGE_ADDED, {
      messageAdded: {
        id: 1,
        content: args.content,
        author: "eu mesmo"
      }
    })

    return {
      id: 1,
      content: args.content,
      author: "eu mesmo"
    }
  }
}
