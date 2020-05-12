const user = require('./user.query')
const message = require('./message.query')

module.exports = {
  ...user,
  ...message
}