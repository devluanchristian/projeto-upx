import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateEquipmentUseCase } from '../../use-cases/create-equipment-use-case'
import { PrismaEquipmentRepository } from '../../repositories/prisma/prisma-equipment-repository'

export async function createEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEquipmentBodySchema = z.object({
    name: z.string(),
    status: z.boolean(),
    nextManutentionDate: z.string(),
    currentInstallationDate: z.string(),
    location: z.string(),
    serialNumber: z.string(),
  })
  const {
    name,
    currentInstallationDate,
    location,
    nextManutentionDate,
    serialNumber,
    status,
  } = createEquipmentBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaEquipmentRepository()
    const createEquipmentUseCase = new CreateEquipmentUseCase(userRepository)

    const { equipment } = await createEquipmentUseCase.execute({
      name,
      currentInstallationDate,
      location,
      nextManutentionDate,
      serialNumber,
      status,
    })
    reply.status(201).send(equipment)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
