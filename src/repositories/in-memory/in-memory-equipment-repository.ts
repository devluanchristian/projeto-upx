import { Prisma, Equipment } from '@prisma/client'
import { EquipmentRepository } from '../equipment-repository'

export class InMemoryEquipmentRepository implements EquipmentRepository {
  public items: Equipment[] = []

  async create(data: Prisma.EquipmentCreateInput) {
    const equipment: Equipment = {
      id: 'equipment-01',
      name: data.name,
      description: data.description ?? null,
      lastManutentionDate: data.lastManutentionDate
        ? new Date(data.lastManutentionDate)
        : null,
      nextManutentionDate: new Date(data.nextManutentionDate),
      currentInstallationDate: new Date(data.currentInstallationDate),
      location: data.location,
      url_image: data.url_image ?? null,
      status: data.status ?? null, // Corrigido para ser boolean | null
      serialNumber: data.serialNumber,
      created_at: new Date(),
      updated_at: new Date() ?? null, //
    }
    this.items.push(equipment)
    return equipment
  }

  async findById(id: string) {
    const equipment = this.items.find((item) => item.id === id)

    if (!equipment) {
      return null
    }
    return equipment
  }

  async save(equipment: Equipment) {
    const itemIndex = this.items.findIndex((item) => item.id === equipment.id)
    this.items[itemIndex] = equipment
    return equipment
  }

  async delete(equipment: Equipment) {
    const itemIndex = this.items.findIndex((item) => item.id === equipment.id)
    this.items.splice(itemIndex, 1)
  }
}
