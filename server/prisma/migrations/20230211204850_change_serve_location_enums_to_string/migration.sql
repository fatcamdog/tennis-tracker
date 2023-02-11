/*
  Warnings:

  - The `firstServeLocation` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `secondServeLocation` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PointDetail" DROP COLUMN "firstServeLocation",
ADD COLUMN     "firstServeLocation" TEXT,
DROP COLUMN "secondServeLocation",
ADD COLUMN     "secondServeLocation" TEXT;
