import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'
import { hash } from 'bcryptjs'

interface EditAcconutRequest {
  userCPF: string
  name: string
  CPF: string
  password: string
  status: boolean
}

interface EditAcconutResponse {
  user: User
}

export class EditAcconutUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    CPF,
    password,
    status,
  }: EditAcconutRequest): Promise<EditAcconutResponse> {
    const user = await this.userRepository.findByCPF(CPF)
    const password_hash = await hash(password, 8)
    if (!user) {
      throw new Error('Credencias invalidas')
    }
    user.name = name
    user.password_hash = password_hash
    user.status = status
    user.CPF = CPF
    return {
      user,
    }
  }
}
