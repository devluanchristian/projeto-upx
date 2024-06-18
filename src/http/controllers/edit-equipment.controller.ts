import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaEquipmentRepository } from '../../repositories/prisma/prisma-equipment-repository'
import { EditEquipmentUseCase } from '../../use-cases/edit-equipment-use-case'

export async function editEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editEquipmentBodySchema = z.object({
    name: z.string(),
    active: z.boolean(),
    nextManutentionDate: z.string(),
    currentInstallationDate: z.string(),
    location: z.string(),
    serialNumber: z.string(),
    description: z.string(),
  })
  const getEquipmentSchema = z.object({
    equipmentId: z.string(),
  })
  const { equipmentId } = getEquipmentSchema.parse(request.params)
  const {
    name,
    currentInstallationDate,
    location,
    nextManutentionDate,
    serialNumber,
    description,
    active,
  } = editEquipmentBodySchema.parse(request.body)

  try {
    const repositories = new PrismaEquipmentRepository()
    const editEquipmentUseCase = new EditEquipmentUseCase(repositories)

    const { editedEquipment } = await editEquipmentUseCase.execute({
      equipmentId,
      name,
      currentInstallationDate,
      location,
      nextManutentionDate,
      serialNumber,
      description,
      active,
    })
    reply.status(200).send(editedEquipment)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
