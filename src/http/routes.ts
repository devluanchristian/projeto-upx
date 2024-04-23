import { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/signup', createAccount)
}
