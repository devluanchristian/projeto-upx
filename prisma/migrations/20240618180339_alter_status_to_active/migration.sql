/*
  Warnings:

  - You are about to drop the column `status` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN;
