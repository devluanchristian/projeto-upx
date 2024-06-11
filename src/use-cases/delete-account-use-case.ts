import { UserRepository } from '../repositories/user-repository'

interface DeleteUserUseCaseRequest {
  userCPF: string
}

interface DeleteUserUseCaseResponse {}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    userCPF,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findByCPF(userCPF)

    if (!user) {
      throw new Error('User not found')
    }
    await this.userRepository.delete(userCPF)
    return { messagem: 'Account deleted successfully' }
  }
}
