/*
  Warnings:

  - You are about to drop the column `last_installation_date` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `next_installation_date` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "last_installation_date",
DROP COLUMN "next_installation_date",
ADD COLUMN     "lastInstallationDate" TIMESTAMP(3),
ADD COLUMN     "nextInstallationDate" TIMESTAMP(3);
