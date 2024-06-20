import { Equipment } from '@prisma/client'
import { EquipmentRepository } from '../repositories/equipment-repository'

interface EditEquipmentUseCaseRequest {
  equipmentId: string
  name: string
  active?: boolean
  currentInstallationDate: string
  nextManutentionDate: string
  location: string
  serialNumber: string
  description: string | null
  updated_at?: string
  maintenanceCount: number | null
  lastManutentionDate?: string
  status: string | null
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
    active,
    serialNumber,
    description,
    maintenanceCount,
    lastManutentionDate,
    status,
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
    if (active) {
      equipment.active = true
    } else {
      equipment.active = false
    }
    equipment.maintenanceCount = maintenanceCount
    if (lastManutentionDate) {
      equipment.lastManutentionDate = new Date(lastManutentionDate)
    } else {
      equipment.lastManutentionDate = null
    }
    equipment.status = status
    const editedEquipment = await this.equipmentRepository.save(
      equipmentId,
      equipment,
    )
    return { editedEquipment }
  }
}
