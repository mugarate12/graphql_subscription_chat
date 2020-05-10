const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { importSchema } = require('graphql-import')
const { ApolloServer } = require('apollo-server-express')
const connection = require('./database/connection')

const PORT = process.env.PORT || 3333
const typeDefs = importSchema(__dirname + '/graphql/schema/index.graphql')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authToken = req.headers.authorization || ''
    return {
      connection,
      authToken
    }
  }
})
const app = express()

app.use(cors())

const httpServer = createServer(app)
server.applyMiddleware({ app })
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`listening on port ws://localhost:${PORT}${server.subscriptionsPath}`)
})
