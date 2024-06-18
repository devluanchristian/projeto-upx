import { Equipment } from '@prisma/client'
import { EquipmentRepository } from '../repositories/equipment-repository'

interface EditEquipmentUseCaseRequest {
  equipmentId: string
  name: string
  status?: boolean
  currentInstallationDate: string
  nextManutentionDate: string
  location: string
  serialNumber: string
  description: string
  updated_at?: string
}

interface EditEquipmentUseCaseResponse {
  editedEquipment: Equipment
}

export class EditEquipmentUseCase {
  constructor(private equipmentRepository: EquipmentRepository) {}
  async execute({
    equipmentId,
    name,
    currentInstallationDate,
    nextManutentionDate,
    location,
    status,
    serialNumber,
    description,
  }: EditEquipmentUseCaseRequest): Promise<EditEquipmentUseCaseResponse> {
    const equipment = await this.equipmentRepository.findById(equipmentId)

    if (!equipment) {
      throw new Error('Equipment not found')
    }
    equipment.name = name
    equipment.currentInstallationDate = new Date(currentInstallationDate)
    equipment.nextManutentionDate = new Date(nextManutentionDate)
    equipment.location = location
    equipment.serialNumber = serialNumber
    equipment.description = description
    equipment.updated_at = new Date()
    if (status) {
      equipment.status = true
    } else {
      equipment.status = false
    }
    const editedEquipment = await this.equipmentRepository.save(
      equipmentId,
      equipment,
    )
    return { editedEquipment }
  }
}
