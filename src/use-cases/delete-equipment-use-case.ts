import { EquipmentRepository } from '../repositories/equipment-repository'

interface DeleteEquipmentUseCaseRequest {
  equipmentId: string
}

interface DeleteEquipmentUseCaseResponse {}

export class DeleteEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}
  async execute({
    equipmentId,
  }: DeleteEquipmentUseCaseRequest): Promise<DeleteEquipmentUseCaseResponse> {
    const equipment = await this.equipmentRepository.findById(equipmentId)

    if (!equipment) {
      throw new Error('Equipment not found')
    }
    await this.equipmentRepository.delete(equipmentId)
    return { messagem: 'Item deleted successfully' }
  }
}
