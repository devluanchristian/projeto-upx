/*
  Warnings:

  - You are about to drop the column `maintenance_count` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "maintenance_count",
ADD COLUMN     "maintenanceCount" INTEGER DEFAULT 0;
