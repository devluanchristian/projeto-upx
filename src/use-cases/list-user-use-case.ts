import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'

interface ListUserResponse {
  users: User[]
}

export class ListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListUserResponse> {
    const users = await this.userRepository.list()

    return { users }
  }
}
