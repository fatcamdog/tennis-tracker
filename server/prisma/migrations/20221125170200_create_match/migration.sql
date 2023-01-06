-- CreateEnum
CREATE TYPE "Method" AS ENUM ('ace', 'double_fault', 'winner', 'forced_error', 'unforced_error');

-- CreateEnum
CREATE TYPE "Stroke" AS ENUM ('serve', 'forehand_groundstroke', 'backhand_grounstroke', 'forehand_slice', 'backhand_slice', 'forehand_volley', 'backhand_volley', 'forehand_dropshot', 'backhand_dropshot', 'overhead');

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "opponent" TEXT NOT NULL,
    "won" BOOLEAN NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "userSets" INTEGER NOT NULL,
    "oppSets" INTEGER NOT NULL,
    "userGames" INTEGER[],
    "oppGames" INTEGER[],
    "userPoints" INTEGER NOT NULL,
    "oppPoints" INTEGER NOT NULL,
    "userDisplayPoints" TEXT NOT NULL,
    "oppDisplayPoints" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointDetail" (
    "id" SERIAL NOT NULL,
    "won" BOOLEAN NOT NULL,
    "method" "Method" NOT NULL,
    "stroke" "Stroke" NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "PointDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointDetail" ADD CONSTRAINT "PointDetail_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
