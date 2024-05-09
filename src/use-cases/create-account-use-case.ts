import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'
import { hash } from 'bcryptjs'

interface CreateAccountUseCaseRequest {
  name: string
  CPF: string
  password: string
}

interface CreateAccountUseCaseResponse {
  user: User
}

export class CreateAccountUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    name,
    CPF,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const password_hash = await hash(password, 8)

    const cpfAlreadyExists = await this.userRepository.findByCPF(CPF)
    if (cpfAlreadyExists) {
      throw new Error('CPF already exists')
    }
    const user = await this.userRepository.create({
      name,
      CPF,
      password_hash,
    })
    return { user }
  }
}
