import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { AuthenticateAccountUseCase } from './authenticate-account-use-case'
let userRepository: InMemoryUserRepository
let authenticateAccountUseCase: AuthenticateAccountUseCase

describe('Authenticate account user use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    authenticateAccountUseCase = new AuthenticateAccountUseCase(userRepository)

    await userRepository.create({
      name: 'Luan Christian',
      CPF: '13826621655',
      password_hash: await hash('12345678', 8),
    })
  })
  it('should authenticate a user account', async () => {
    const { user } = await authenticateAccountUseCase.execute({
      CPF: '13826621655',
      password: '12345678',
    })
    expect(user.CPF).toEqual('13826621655')
  })
  it('should not be able to authenticate with wrong CPF', async () => {
    await expect(() =>
      authenticateAccountUseCase.execute({
        CPF: '13826621654',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
