import { ApolloServer } from 'apollo-server-cloud-functions'
import { region } from 'firebase-functions'
import { US_CENTRAL1 } from './constants/region'
import schema from './schema'

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true
})

const handler = server.createHandler({
  cors: { origin: '*', credentials: true }
})

module.exports = region(US_CENTRAL1).https.onRequest(handler)
