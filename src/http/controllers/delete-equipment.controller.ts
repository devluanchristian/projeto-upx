import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaEquipmentRepository } from '../../repositories/prisma/prisma-equipment-repository'
import { DeleteEquipmentUseCase } from '../../use-cases/delete-equipment-use-case'

export async function deleteEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEquipmentSchema = z.object({
    equipmentId: z.string(),
  })
  const { equipmentId } = getEquipmentSchema.parse(request.params)

  try {
    const repositories = new PrismaEquipmentRepository()
    const deleteEquipmentUseCase = new DeleteEquipmentUseCase(repositories)

    await deleteEquipmentUseCase.execute({
      equipmentId,
    })
    reply.status(200).send({ message: 'Equipment deleted successfully' })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
