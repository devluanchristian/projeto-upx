import { FastifyRequest, FastifyReply } from 'fastify'

import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'

import { ListUserUseCase } from '../../use-cases/list-user-use-case'

export async function listUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userRepository = new PrismaUserRepository()
    const listUserUseCase = new ListUserUseCase(userRepository)

    const users = await listUserUseCase.execute()

    reply.status(200).send(users)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
