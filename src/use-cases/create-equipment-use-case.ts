import { Equipment } from '@prisma/client'
import { EquipmentRepository } from '../repositories/equipment-repository'

interface CreateEquipmentUseCaseRequest {
  name: string
  status?: boolean
  currentInstallationDate: string
  nextManutentionDate: string
  location: string
  serialNumber: string
}

interface CreateEquipmentUseCaseResponse {
  equipment: Equipment
}

export class CreateEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}
  async execute({
    name,
    currentInstallationDate,
    nextManutentionDate,
    location,
    serialNumber,
  }: CreateEquipmentUseCaseRequest): Promise<CreateEquipmentUseCaseResponse> {
    const equipment = await this.equipmentRepository.create({
      name,
      status: true,
      currentInstallationDate,
      nextManutentionDate,
      location,
      serialNumber,
    })
    return { equipment }
  }
}
