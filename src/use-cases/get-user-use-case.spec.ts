import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { GetUserUseCase } from './get-user-use-case'

let userRepository: InMemoryUserRepository
let sut: GetUserUseCase

describe('Get user use case', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(userRepository)

    await userRepository.create({
      name: 'Luan Christian',
      CPF: '13826621655',
      password_hash: await hash('12345678', 8),
    })
  })
  it('should get user a user account', async () => {
    const { user } = await sut.execute({
      CPF: '13826621655',
    })
    expect(user.CPF).toEqual('13826621655')
  })
  it('should not be able to get user with wrong CPF', async () => {
    await expect(() =>
      sut.execute({
        CPF: '13826621654',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
