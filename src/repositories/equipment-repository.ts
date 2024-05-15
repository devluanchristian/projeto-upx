import { Equipment, Prisma } from '@prisma/client'

export interface EquipmentRepository {
  create(data: Prisma.EquipmentCreateInput): Promise<Equipment>
  findById(id: string): Promise<Equipment | null>
  save(equipment: Equipment): Promise<Equipment>
  delete(equipment: Equipment): Promise<void>
}
