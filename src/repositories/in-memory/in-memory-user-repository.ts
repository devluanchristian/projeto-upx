import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-01',
      name: data.name,
      CPF: data.CPF,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)
    return user
  }

  async findByCPF(CPF: string) {
    const user = this.items.find((user) => user.CPF === CPF)
    if (!user) {
      return null
    }
    return user
  }

  async list(): Promise<User[]> {
    return this.items
  }
}
