import { Equipment, Prisma } from '@prisma/client'

export interface EquipmentRepository {
  create(data: Prisma.EquipmentCreateInput): Promise<Equipment>
  // findById(id: string): Promise<Equipment | null>
}
