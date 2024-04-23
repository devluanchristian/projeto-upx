import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { CreateAccountUseCase } from './create-account-use-case'
import { it, expect, describe, beforeEach } from 'vitest'

let userRepository: InMemoryUserRepository
let createAccountUseCase: CreateAccountUseCase

describe('Create account user use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    createAccountUseCase = new CreateAccountUseCase(userRepository)
  })

  it('should to create a new account user', async () => {
    const { user } = await createAccountUseCase.execute({
      name: 'Luan Christian',
      CPF: '13826621655',
      password: 'password',
    })
    console.log(user)
    expect(user.id).toEqual(expect.any(String))
  })
})
