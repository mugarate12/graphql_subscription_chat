const { graphql } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { importSchema } = require('graphql-import')

const typeDefs = importSchema(__dirname + './../graphql/schema/index.graphql')
const resolvers = require('./../graphql/resolvers/index')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// ver se esse user Id é necessário
module.exports = async (query, variables, userId) => {
  return graphql (
    schema,
    query,
    undefined,
    {
      // req: {
      //   session: {
      //     userId
      //   }
      // },
      res: {
        clearCookie: () => {}
      }
    },
    variables
  )
}
