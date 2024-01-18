/*
  Warnings:

  - A unique constraint covering the columns `[short]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_short_key" ON "Url"("short");
