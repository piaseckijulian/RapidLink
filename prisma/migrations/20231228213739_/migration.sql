/*
  Warnings:

  - You are about to drop the column `userId` on the `Url` table. All the data in the column will be lost.
  - You are about to drop the column `authId` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_userId_fkey";

-- AlterTable
ALTER TABLE "Url" DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authId";

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
