const express = require('express')
const cors = require('cors')
const { createServer } = require('http')
const { importSchema } = require('graphql-import')
const { ApolloServer } = require('apollo-server-express')
const connection = require('./database/connection')

const { verifyToken, validateToken } = require('./middlewares/verifyToken')

const PORT = process.env.PORT || 3333
const typeDefs = importSchema(__dirname + '/graphql/schema/index.graphql')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const authToken =  req.headers.authorization || ''
      return {
        connection,
        authToken
      }
    } else {
      const authToken = ''
      return {
        connection,
        authToken
      }
    }
  },
  subscriptions: {
    onConnect: async (connectionParams, webSocket, context) => {
      const authUser = await verifyToken(connectionParams.Authorization)
      validateToken(authUser)
      
      return 
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
