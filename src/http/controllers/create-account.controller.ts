import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { isValidCPF } from './util/isValidCPF'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { CreateAccountUseCase } from '../../use-cases/create-account-use-case'

export async function createAccount(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createAccountBodySchema = z.object({
    name: z.string(),
    CPF: z.string().refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
    password: z.string().min(8),
  })
  const { name, CPF, password } = createAccountBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const createAccountUseCase = new CreateAccountUseCase(userRepository)

    const { user } = await createAccountUseCase.execute({
      name,
      CPF,
      password,
    })
    reply.status(201).send(user)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
