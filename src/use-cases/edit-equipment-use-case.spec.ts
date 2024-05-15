import { InMemoryEquipmentRepository } from '../repositories/in-memory/in-memory-equipment-repository'
import { it, expect, describe, beforeEach } from 'vitest'
import { EditEquipmentUseCase } from './edit-equipment-use-case'
import { CreateEquipmentUseCase } from './create-equipment-use-case'

let equipmentRepository: InMemoryEquipmentRepository
let editEquipmentUseCase: EditEquipmentUseCase
let createEquipmentUseCase: CreateEquipmentUseCase

describe('Edit equipment use case', () => {
  beforeEach(async () => {
    equipmentRepository = new InMemoryEquipmentRepository()
    createEquipmentUseCase = new CreateEquipmentUseCase(equipmentRepository)
    editEquipmentUseCase = new EditEquipmentUseCase(equipmentRepository)
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

    // Verificação se o equipamento foi criado corretamente
    if (!equipment || !equipment.id) {
      throw new Error('Failed to create equipment')
    }

    // Edição do equipamento
    const editResult = await editEquipmentUseCase.execute({
      equipmentId: equipment.id,
      name: 'teste',
      currentInstallationDate: '2021-01-02',
      location: 'setor 4',
      nextManutentionDate: '2021-04-02',
      serialNumber: '234234234',
      status: false,
    })

    console.log('Edit result:', editResult)
    const { editedEquipment } = editResult

    // Verificação se a edição do equipamento foi bem-sucedida
    if (!editedEquipment || !editedEquipment.id) {
      throw new Error('Failed to edit equipment')
    }
    console.log('Edited equipment:', editedEquipment)

    // Comparação do ID do equipamento original com o ID do equipamento editado
    expect(editedEquipment.id).toEqual(equipment.id)
  })
})
