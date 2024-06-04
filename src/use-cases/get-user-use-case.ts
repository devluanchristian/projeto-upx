import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'

interface GetUserRequest {
  CPF: string
}

interface GetUserRequestResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ CPF }: GetUserRequest): Promise<GetUserRequestResponse> {
    const user = await this.userRepository.findByCPF(CPF)

    if (!user) {
      throw new Error(' Usuario não existe')
    }

    return {
      user,
    }
  }
}
