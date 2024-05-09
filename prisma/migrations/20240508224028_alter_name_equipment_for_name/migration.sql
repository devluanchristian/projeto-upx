/*
  Warnings:

  - You are about to drop the column `equipment` on the `Equipment` table. All the data in the column will be lost.
  - Added the required column `name` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "equipment",
ADD COLUMN     "name" TEXT NOT NULL;
