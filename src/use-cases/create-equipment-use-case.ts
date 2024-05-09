import { Equipment } from '@prisma/client'
import { EquipmentRepository } from '../repositories/equipment-repository'

interface CreateEquipmentUseCaseRequest {
  name: string
  status: boolean
}

interface CreateEquipmentUseCaseResponse {
  equipment: Equipment
}

export class CreateEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}
  async execute({
    name,
    status,
  }: CreateEquipmentUseCaseRequest): Promise<CreateEquipmentUseCaseResponse> {
    const equipment = await this.equipmentRepository.create({
      name,
      status,
    })
    return { equipment }
  }
}
