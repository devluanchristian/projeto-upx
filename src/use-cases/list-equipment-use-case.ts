import { Equipment } from '@prisma/client'
import { EquipmentRepository } from '../repositories/equipment-repository'

interface ListEquipmentResponse {
  equipments: Equipment[]
}

export class ListEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}

  async execute(): Promise<ListEquipmentResponse> {
    const equipments = await this.equipmentRepository.list()

    return { equipments }
  }
}
