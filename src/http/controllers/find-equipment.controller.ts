import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaEquipmentRepository } from '../../repositories/prisma/prisma-equipment-repository'
import { FindEquipmentUseCase } from '../../use-cases/find-equipment-use-case'

export async function findEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEquipmentSchema = z.object({
    equipmentId: z.string(),
  })
  const { equipmentId } = getEquipmentSchema.parse(request.params)

  try {
    const repositories = new PrismaEquipmentRepository()
    const findEquipmentUseCase = new FindEquipmentUseCase(repositories)

    const { equipment } = await findEquipmentUseCase.execute({
      equipmentId,
    })
    reply.status(200).send({ equipment })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
