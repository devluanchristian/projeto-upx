/*
  Warnings:

  - You are about to drop the column `lastInstallationDate` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `nextInstallationDate` on the `Equipment` table. All the data in the column will be lost.
  - Added the required column `currentInstallationDate` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextManutentionDate` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serialNumber` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "lastInstallationDate",
DROP COLUMN "nextInstallationDate",
ADD COLUMN     "currentInstallationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "lastManutentionDate" TIMESTAMP(3),
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "nextManutentionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "serialNumber" TEXT NOT NULL,
ADD COLUMN     "url_image" TEXT;
