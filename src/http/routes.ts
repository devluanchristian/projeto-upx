import { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account.controller'
import { authenticateAccount } from './controllers/authenticate-account.controller'
import { createEquipment } from './controllers/create-equipment.controller'
import { editEquipment } from './controllers/edit-equipment.controller'
import { deleteEquipment } from './controllers/delete-equipment.controller'
import { getUser } from './controllers/get-user.controller'
import { listUser } from './controllers/list-user.controller'
import { listEquipment } from './controllers/list-equipment.controller'
import { editUser } from './controllers/edit-user.controller'
import { deleteUser } from './controllers/delete-account.controller'
import { findEquipment } from './controllers/find-equipment.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', createAccount)
  app.get('/user/:CPF', getUser)
  app.get('/user', listUser)
  app.get('/equipment', listEquipment)
  app.get('/equipment/:equipmentId', findEquipment)
  app.post('/login', authenticateAccount)
  app.post('/equipment', createEquipment)
  app.patch('/equipment/:equipmentId', editEquipment)
  app.patch('/user/:userCPF', editUser)
  app.delete('/user/:CPF', deleteUser)
  app.delete('/equipment/:equipmentId', deleteEquipment)
}
