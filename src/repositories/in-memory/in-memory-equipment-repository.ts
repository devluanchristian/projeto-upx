import { Prisma, Equipment } from '@prisma/client'
import { EquipmentRepository } from '../equipment-repository'

export class InMemoryEquipmentRepository implements EquipmentRepository {
  public items: Equipment[] = []

  async create(data: Prisma.EquipmentCreateInput) {
    const equipment: Equipment = {
      id: 'equipment-01',
      name: data.name,
      description: data.description ?? null,
      lastManutentionDate: new Date() ?? null,
      nextManutentionDate: new Date() ?? null,
      currentInstallationDate: new Date() ?? null,
      location: data.location,
      url_image: data.url_image ?? null,
      serialNumber: data.serialNumber,
      status: data.status ?? true,
      created_at: new Date(),
    }
    this.items.push(equipment)
    return equipment
  }
}
