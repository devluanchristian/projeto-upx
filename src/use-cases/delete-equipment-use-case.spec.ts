import { InMemoryEquipmentRepository } from '../repositories/in-memory/in-memory-equipment-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { CreateEquipmentUseCase } from './create-equipment-use-case'
import { DeleteEquipmentUseCase } from './delete-equipment-use-case'

let equipmentRepository: InMemoryEquipmentRepository
let deleteEquipmentUseCase: DeleteEquipmentUseCase
let createEquipmentUseCase: CreateEquipmentUseCase

describe('Edit equipment use case', () => {
  beforeEach(async () => {
    equipmentRepository = new InMemoryEquipmentRepository()
    createEquipmentUseCase = new CreateEquipmentUseCase(equipmentRepository)
    deleteEquipmentUseCase = new DeleteEquipmentUseCase(equipmentRepository)
  })

  it('should edit an equipment', async () => {
    // Criação do equipamento
    const createResult = await createEquipmentUseCase.execute({
      name: 'Equipment',
      currentInstallationDate: '2024-01-02',
      location: 'setor 4',
      nextManutentionDate: '2024-04-02',
      serialNumber: '213423549234598',
    })

    const { equipment } = createResult
    console.log('Created equipment:', equipment)

    await deleteEquipmentUseCase.execute({
      equipmentId: equipment.id,
    })

    // Comparação do ID do equipamento original com o ID do equipamento editado
    expect(equipmentRepository.items).toHaveLength(0)
  })
})
