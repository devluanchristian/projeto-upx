import { Prisma, Equipment } from '@prisma/client'
import { EquipmentRepository } from '../equipment-repository'

export class InMemoryEquipmentRepository implements EquipmentRepository {
  public items: Equipment[] = []

  async create(data: Prisma.EquipmentCreateInput) {
    const equipment = {
      id: 'equipment-01',
      name: data.name,
      lastInstallationDate: new Date() ?? null,
      nextInstallationDate: new Date() ?? null,
      status: data.status ?? true,
      created_at: new Date(),
    }
    this.items.push(equipment)
    return equipment
  }
}
