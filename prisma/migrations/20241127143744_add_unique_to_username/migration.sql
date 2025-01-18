/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `Identity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Identity_userName_key" ON "identities"("userName");
