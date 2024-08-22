-- DropForeignKey
ALTER TABLE "UserToRoom" DROP CONSTRAINT "UserToRoom_userId_fkey";

-- AlterTable
ALTER TABLE "UserToRoom" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "UserToRoom_id_seq";

-- AddForeignKey
ALTER TABLE "UserToRoom" ADD CONSTRAINT "UserToRoom_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
