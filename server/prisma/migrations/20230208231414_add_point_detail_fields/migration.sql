/*
  Warnings:

  - The values [backhand_grounstroke] on the enum `Stroke` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `duration` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numSets` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serving` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suddenDeath` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiebreak` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trackingMode` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oppDisplayPoints` to the `PointDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serving` to the `PointDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDisplayPoints` to the `PointDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Hitter" AS ENUM ('user', 'opponent');

-- CreateEnum
CREATE TYPE "TrackingMode" AS ENUM ('starting', 'rallying', 'mentality');

-- CreateEnum
CREATE TYPE "ServeFault" AS ENUM ('first', 'second', 'double');

-- CreateEnum
CREATE TYPE "PlayingSide" AS ENUM ('deuce', 'ad');

-- CreateEnum
CREATE TYPE "ShotLocations" AS ENUM ('net', 'wide_deuce', 'wide_ad', 'long', 'serve_wide_wide', 'serve_wide_tee', 'serve_wide_deuce', 'serve_middle_deuce', 'serve_tee_deuce', 'serve_tee_ad', 'serve_middle_ad', 'serve_wide_ad', 'deep_deuce', 'deep_middle', 'deep_ad', 'short_deuce', 'short_middle', 'short_ad', 'ace', 'double', 'bypass');

-- CreateEnum
CREATE TYPE "ReturnStrokes" AS ENUM ('double', 'ace', 'forehand', 'backhand');

-- AlterEnum
BEGIN;
CREATE TYPE "Stroke_new" AS ENUM ('serve', 'forehand', 'backhand', 'forehand_groundstroke', 'backhand_groundstroke', 'forehand_slice', 'backhand_slice', 'forehand_volley', 'backhand_volley', 'forehand_dropshot', 'backhand_dropshot', 'overhead', 'double', 'ace');
ALTER TABLE "PointDetail" ALTER COLUMN "stroke" TYPE "Stroke_new" USING ("stroke"::text::"Stroke_new");
ALTER TYPE "Stroke" RENAME TO "Stroke_old";
ALTER TYPE "Stroke_new" RENAME TO "Stroke";
DROP TYPE "Stroke_old";
COMMIT;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "numSets" INTEGER NOT NULL,
ADD COLUMN     "serving" BOOLEAN NOT NULL,
ADD COLUMN     "side" "PlayingSide" NOT NULL,
ADD COLUMN     "suddenDeath" BOOLEAN NOT NULL,
ADD COLUMN     "tiebreak" BOOLEAN NOT NULL,
ADD COLUMN     "trackingMode" "TrackingMode" NOT NULL;

-- AlterTable
ALTER TABLE "PointDetail" ADD COLUMN     "fault" "ServeFault" DEFAULT 'first',
ADD COLUMN     "firstServeLocation" "ShotLocations",
ADD COLUMN     "hitter" "Hitter",
ADD COLUMN     "location" "ShotLocations",
ADD COLUMN     "oppDisplayPoints" TEXT NOT NULL,
ADD COLUMN     "oppGames" INTEGER[],
ADD COLUMN     "opponentReaction" TEXT,
ADD COLUMN     "pointNotes" TEXT,
ADD COLUMN     "returned" BOOLEAN,
ADD COLUMN     "secondServeLocation" "ShotLocations",
ADD COLUMN     "serving" BOOLEAN NOT NULL,
ADD COLUMN     "side" "PlayingSide" DEFAULT 'deuce',
ADD COLUMN     "userDisplayPoints" TEXT NOT NULL,
ADD COLUMN     "userGames" INTEGER[],
ADD COLUMN     "userReaction" TEXT,
ALTER COLUMN "method" DROP NOT NULL,
ALTER COLUMN "stroke" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT NOT NULL;
