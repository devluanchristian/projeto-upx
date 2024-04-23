/*
  Warnings:

  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CPF]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CPF` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
ADD COLUMN     "CPF" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_CPF_key" ON "User"("CPF");
