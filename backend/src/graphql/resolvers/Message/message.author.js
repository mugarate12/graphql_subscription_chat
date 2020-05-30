const { graphqlFields } = require('./../../../utils/graphqlUtils')
const { handleError } = require('./../../../utils/utils')

const USER_TABLE_NAME = 'users'

module.exports = {
  Message: {
    author: async (parent, args, { connection }, info) => {
      let fields = graphqlFields(info)

      // se for do message ou qualquer outro campo, o parent.authorFK, caso essa chamada ocorra
      // da subscription passa a retornar undefined e o mesmo valor será encontrado em parent.author.id
      const userID = parent.authorFK === undefined ? parent.author.id : parent.authorFK 
      
      return await connection(USER_TABLE_NAME)
        .select(fields)
        .where({
          id: userID
        })
        .first()
        .then(user => user)
        .catch(handleError)
    }
  }
}