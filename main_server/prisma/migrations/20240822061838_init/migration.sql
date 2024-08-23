/*
  Warnings:

  - You are about to drop the column `followers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `following` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "followers",
DROP COLUMN "following",
ADD COLUMN     "friends" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "requested" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "UserToRoom" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "UserToRoom_pkey" PRIMARY KEY ("id")
);
