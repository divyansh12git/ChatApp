-- DropForeignKey
ALTER TABLE "UserToRoom" DROP CONSTRAINT "UserToRoom_id_fkey";

-- AlterTable
CREATE SEQUENCE usertoroom_id_seq;
ALTER TABLE "UserToRoom" ALTER COLUMN "id" SET DEFAULT nextval('usertoroom_id_seq');
ALTER SEQUENCE usertoroom_id_seq OWNED BY "UserToRoom"."id";

-- AddForeignKey
ALTER TABLE "UserToRoom" ADD CONSTRAINT "UserToRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
