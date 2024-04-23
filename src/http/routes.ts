import { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account.controller'
import { authenticateAccount } from './controllers/authenticate-account.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', createAccount)
  app.post('/signin', authenticateAccount)
}
