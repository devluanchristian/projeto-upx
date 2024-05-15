import { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account.controller'
import { authenticateAccount } from './controllers/authenticate-account.controller'
import { createEquipment } from './controllers/create-equipment.controller'
import { editEquipment } from './controllers/edit-equipment.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', createAccount)
  app.post('/login', authenticateAccount)
  app.post('/createEquipment', createEquipment)
  app.post('/editedEquipment/:equipmentId', editEquipment)
}
