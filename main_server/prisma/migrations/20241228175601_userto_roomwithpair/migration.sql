/*
  Warnings:

  - The `rooms` column on the `UserToRoom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserToRoom" DROP COLUMN "rooms",
ADD COLUMN     "rooms" JSONB[];
