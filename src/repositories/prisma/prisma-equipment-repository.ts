import { Prisma, PrismaClient } from '@prisma/client'
import { EquipmentRepository } from '../equipment-repository'

export class PrismaEquipmentRepository
  extends PrismaClient
  implements EquipmentRepository
{
  constructor() {
    super({
      log: ['warn', 'error'],
    })
  }

  async create(data: Prisma.EquipmentCreateInput) {
    const equipment = await this.equipment.create({
      data,
    })
    return equipment
  }

  async findById(id: string) {
    const equipment = await this.equipment.findUnique({
      where: { id },
    })
    return equipment
  }

  async save(id: string, data: Prisma.EquipmentUpdateInput) {
    const editedEquipment = await this.equipment.update({
      where: { id },
      data,
    })
    return editedEquipment
  }

  async delete(id: string) {
    await this.equipment.delete({
      where: { id },
    })
  }
}
