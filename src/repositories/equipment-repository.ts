import { Equipment, Prisma } from '@prisma/client'

export interface EquipmentRepository {
  create(data: Prisma.EquipmentCreateInput): Promise<Equipment>
  findById(id: string): Promise<Equipment | null>
  save(id: string, equipment: Equipment): Promise<Equipment>
  delete(id: string): Promise<void>
  list(): Promise<Equipment[]>
}
