import { Prisma, PrismaClient } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository
  extends PrismaClient
  implements UserRepository
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.user.create({
      data,
    })
    return user
  }

  async findByCPF(CPF: string) {
    const user = await this.user.findUnique({
      where: { CPF },
    })
    return user
  }

  async list() {
    const listUser = await this.user.findMany()
    return listUser
  }

  async save(CPF: string, data: Prisma.UserUpdateInput) {
    const editedUser = await this.user.update({
      where: { CPF },
      data,
    })
    return editedUser
  }

  async delete(CPF: string) {
    await this.user.delete({
      where: { CPF },
    })
  }
}
