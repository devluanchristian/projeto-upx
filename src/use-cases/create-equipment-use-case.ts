import { Equipment } from '@prisma/client'
import { EquipmentRepository } from '../repositories/equipment-repository'

interface CreateEquipmentUseCaseRequest {
  name: string
  active?: boolean
  currentInstallationDate: string
  nextManutentionDate: string
  location: string
  serialNumber: string
  description?: string
  status?: string
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
    description,
  }: CreateEquipmentUseCaseRequest): Promise<CreateEquipmentUseCaseResponse> {
    const equipment = await this.equipmentRepository.create({
      name,
      active: true,
      currentInstallationDate,
      nextManutentionDate,
      location,
      serialNumber,
      description,
      status: 'Agendada',
    })
    return { equipment }
  }
}
