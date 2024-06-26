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
  editAccountUser: User
}

export class EditAcconutUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    CPF,
    password,
    status,
    userCPF,
  }: EditAcconutRequest): Promise<EditAcconutResponse> {
    const user = await this.userRepository.findByCPF(userCPF)
    const password_hash = await hash(password, 8)
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    user.name = name
    user.password_hash = password_hash
    user.status = status
    user.CPF = CPF

    const editAccountUser = await this.userRepository.save(userCPF, user)
    return {
      editAccountUser,
    }
  }
}
