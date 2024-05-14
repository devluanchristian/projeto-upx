import { InMemoryEquipmentRepository } from '../repositories/in-memory/in-memory-equipment-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { CreateEquipmentUseCase } from './create-equipment-use-case'

let equipmentRepository: InMemoryEquipmentRepository
let createEquipmentUseCase: CreateEquipmentUseCase

describe('Create equipment use case', () => {
  beforeEach(() => {
    equipmentRepository = new InMemoryEquipmentRepository()
    createEquipmentUseCase = new CreateEquipmentUseCase(equipmentRepository)
  })

  it('should to create a new equipment', async () => {
    const futureDate = new Date()
    futureDate.setMonth(futureDate.getMonth() + 5)
    const { equipment } = await createEquipmentUseCase.execute({
      name: 'Ferramenta 01',
      currentInstallationDate: new Date().toLocaleDateString(),
      location: 'setor 3',
      nextManutentionDate: futureDate.toLocaleDateString(),
      serialNumber: '53843828NNKJAD0',
    })
    console.log(equipment)
    expect(equipment.id).toEqual(expect.any(String))
  })
})
