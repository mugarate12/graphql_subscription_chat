const { graphql } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { importSchema } = require('graphql-import')
const connection = require('./../database/connection')

const typeDefs = importSchema(__dirname + './../graphql/schema/index.graphql')
const resolvers = require('./../graphql/resolvers/index')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// ver se esse user Id é necessário
module.exports = async (query, variables, authToken = '') => {
  return graphql (
    schema,
    query,
    undefined,
    {
      authToken,
      connection,
      res: {
        clearCookie: () => {}
      }
    },
    variables
  )
}
