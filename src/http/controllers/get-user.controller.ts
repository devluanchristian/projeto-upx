import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { isValidCPF } from './util/isValidCPF'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { GetUserUseCase } from '../../use-cases/get-user-use-case'

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserBodySchema = z.object({
    CPF: z.string().refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
  })
  const { CPF } = getUserBodySchema.parse(request.params)

  try {
    const userRepository = new PrismaUserRepository()
    const getUserUseCase = new GetUserUseCase(userRepository)

    const { user } = await getUserUseCase.execute({
      CPF,
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userWithoutPassword } = user
    reply.status(200).send({ user: userWithoutPassword })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
