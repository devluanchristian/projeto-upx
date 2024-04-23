import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { isValidCPF } from './util/isValidCPF'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { AuthenticateAccountUseCase } from '../../use-cases/authenticate-account-use-case'

export async function authenticateAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateAccountBodySchema = z.object({
    CPF: z.string().refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
    password: z.string().min(8),
  })
  const { CPF, password } = authenticateAccountBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateAccountUseCase = new AuthenticateAccountUseCase(
      userRepository,
    )

    const { user } = await authenticateAccountUseCase.execute({
      CPF,
      password,
    })
    reply.status(200).send({ message: `Olá ${user.name}, você está logado` })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
