const message = require('./message.mutation')
const user = require('./user.mutation')

module.exports = {
  ...message,
  ...user
}
