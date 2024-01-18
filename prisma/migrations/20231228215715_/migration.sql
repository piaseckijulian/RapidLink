-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_authorId_fkey";

-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "authorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
