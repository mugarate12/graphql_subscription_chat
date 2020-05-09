const express = require('express')
const { createServer } = require('http')
const cors = require('cors')
const { importSchema } = require('graphql-import')
const { ApolloServer } = require('apollo-server-express')

const PORT = process.env.PORT || 3333
const typeDefs = importSchema(__dirname + '/graphql/schema/index.graphql')
const resolvers = require('./graphql/resolvers/index')

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

app.use(cors())

const httpServer = createServer(app)
server.applyMiddleware({ app })
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`listening on port ws://localhost:${PORT}${server.subscriptionsPath}`)
})
