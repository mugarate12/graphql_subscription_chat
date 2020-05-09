const bcrypt = require('bcryptjs')

module.exports = async (password) => {
  const salt = await bcrypt.genSalt()

  const newPassword = await bcrypt.hash(password, salt)
  return newPassword
}
