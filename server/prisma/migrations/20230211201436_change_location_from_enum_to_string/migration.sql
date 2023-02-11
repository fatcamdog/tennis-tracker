/*
  Warnings:

  - The `location` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PointDetail" DROP COLUMN "location",
ADD COLUMN     "location" TEXT;
