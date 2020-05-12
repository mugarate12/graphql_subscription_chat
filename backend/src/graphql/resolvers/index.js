const Query = require('./Query/index')
const Mutation = require('./Mutation/index')
const Subscription = require('./Subscription/index')
const Message = require('./Message/message.author')

module.exports = {
  Query,
  Mutation,
  Subscription,
  ...Message
}