/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Bio" TEXT,
ADD COLUMN     "followers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "following" INTEGER DEFAULT 0,
ADD COLUMN     "number_of_posts" INTEGER DEFAULT 0,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profilePictureURL" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;
