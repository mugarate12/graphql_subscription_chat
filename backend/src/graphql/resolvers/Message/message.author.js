const { graphqlFields } = require('./../../../utils/graphqlUtils')
const { handleError } = require('./../../../utils/utils')

const USER_TABLE_NAME = 'users'

module.exports = {
  Message: {
    author: async (parent, args, { connection }, info) => {
      let fields = graphqlFields(info)
      return await connection(USER_TABLE_NAME)
        .select(fields)
        .where({
          id: parent.authorFK
        })
        .first()
        .then(user => user)
        .catch(handleError)
    }
  }
}