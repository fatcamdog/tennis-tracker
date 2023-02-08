/*
  Warnings:

  - The `opponentReaction` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userReaction` column on the `PointDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MentalReactions" AS ENUM ('shout', 'fist_pump', 'racket_smash', 'racket_throw', 'ball_smack', 'curse', 'shoe_smack', 'look_up', 'cry', 'none', 'other');

-- AlterTable
ALTER TABLE "PointDetail" DROP COLUMN "opponentReaction",
ADD COLUMN     "opponentReaction" "MentalReactions",
DROP COLUMN "userReaction",
ADD COLUMN     "userReaction" "MentalReactions";
