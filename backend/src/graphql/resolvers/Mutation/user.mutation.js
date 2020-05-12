const { handleError } = require('./../../../utils/utils')
const createHashPassword = require('./../../../utils/createHashPassword')
const USER_TABLE_NAME = 'users'

module.exports = {
  createUser: async (parent, { username, password, name = '' }, { connection }, info) => {
    // se não for informado um name, usa o username como name
    name = name === '' ? username : name
    password = await createHashPassword(password)

    return await connection(USER_TABLE_NAME)
      .insert({ username, password, name })
      .then((user) => true)
      .catch(handleError)
  }
}
