import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaEquipmentRepository } from '../../repositories/prisma/prisma-equipment-repository'
import { ListEquipmentUseCase } from '../../use-cases/list-equipment-use-case'

export async function listEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const equipmentRepository = new PrismaEquipmentRepository()
    const listUserUseCase = new ListEquipmentUseCase(equipmentRepository)

    const users = await listUserUseCase.execute()

    reply.status(200).send(users)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
