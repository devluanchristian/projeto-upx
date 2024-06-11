import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { DeleteUserUseCase } from '../../use-cases/delete-account-use-case'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserSchema = z.object({
    userCPF: z.string(),
  })
  const { userCPF } = getUserSchema.parse(request.params)

  try {
    const repositories = new PrismaUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(repositories)

    await deleteUserUseCase.execute({
      userCPF,
    })
    reply.status(200).send({ message: 'User deleted successfully' })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
