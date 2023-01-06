-- DropForeignKey
ALTER TABLE "PointDetail" DROP CONSTRAINT "PointDetail_matchId_fkey";

-- AddForeignKey
ALTER TABLE "PointDetail" ADD CONSTRAINT "PointDetail_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
