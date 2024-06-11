import { Equipment } from '@prisma/client'

import { EquipmentRepository } from '../repositories/equipment-repository'

interface FindEquipmentRequest {
  equipmentId: string
}

interface FindEquipmentResponse {
  equipment: Equipment
}

export class FindEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}

  async execute({
    equipmentId,
  }: FindEquipmentRequest): Promise<FindEquipmentResponse> {
    const equipment = await this.equipmentRepository.findById(equipmentId)

    if (!equipment) {
      throw new Error('Not fount equipment')
    }

    return {
      equipment,
    }
  }
}
