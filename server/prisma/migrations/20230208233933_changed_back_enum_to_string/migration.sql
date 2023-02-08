/*
  Warnings:

  - The `opponentReaction` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userReaction` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PointDetail" DROP COLUMN "opponentReaction",
ADD COLUMN     "opponentReaction" TEXT,
DROP COLUMN "userReaction",
ADD COLUMN     "userReaction" TEXT;
