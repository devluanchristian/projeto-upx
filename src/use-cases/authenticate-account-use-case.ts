import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'
import { compare } from 'bcryptjs'

interface AccessCredentialsRequest {
  CPF: string
  password: string
}

interface AccountAuthenticationResponse {
  user: User
}

export class AuthenticateAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    CPF,
    password,
  }: AccessCredentialsRequest): Promise<AccountAuthenticationResponse> {
    const user = await this.userRepository.findByCPF(CPF)

    if (!user) {
      throw new Error('Credencias invalidas')
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new Error('Credencias invalidas')
    }
    return {
      user,
    }
  }
}
