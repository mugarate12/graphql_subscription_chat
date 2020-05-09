const bcrypt = require('bcryptjs')
const hashpassword = require('./../../src/utils/createHashPassword')

it('should create a valid hash password', async () => {
  const password = 'IsMyPassword@1231.com'

  const hash = await hashpassword(password)
  const isValidHashPassword = await bcrypt.compare(password, hash)

  expect(isValidHashPassword).toBe(true)
})
