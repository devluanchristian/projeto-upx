import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { isValidCPF } from './util/isValidCPF'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { EditAcconutUseCase } from '../../use-cases/edit-account-use-case'

export async function editUser(request: FastifyRequest, reply: FastifyReply) {
  const editUserBodySchema = z.object({
    name: z.string(),
    status: z.boolean(),
    CPF: z.string().refine((value) => isValidCPF(value), {
      message: 'CPF inválido',
    }),
    password: z.string().min(8),
  })
  const getUserSchema = z.object({
    userCPF: z.string(),
  })
  const { userCPF } = getUserSchema.parse(request.params)
  const { name, CPF, password, status } = editUserBodySchema.parse(request.body)

  try {
    const repositories = new PrismaUserRepository()
    const editUserUseCase = new EditAcconutUseCase(repositories)

    const { editAccountUser } = await editUserUseCase.execute({
      userCPF,
      name,
      CPF,
      password,
      status,
    })
    reply.status(200).send(editAccountUser)
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(400).send({ message: error.message })
    }
    reply.status(500).send({ error })
  }
}
