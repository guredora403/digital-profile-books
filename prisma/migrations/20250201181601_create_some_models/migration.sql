/*
  Warnings:

  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the `identities` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "identities" DROP CONSTRAINT "identities_userId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "userId",
ADD COLUMN     "ownerId" UUID NOT NULL;

-- DropTable
DROP TABLE "identities";

-- CreateTable
CREATE TABLE "card_handles" (
    "id" SERIAL NOT NULL,
    "ownerId" UUID NOT NULL,
    "displayName" TEXT NOT NULL,
    "handleName" TEXT NOT NULL,

    CONSTRAINT "card_handles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_book_entries" (
    "id" SERIAL NOT NULL,
    "ownerId" UUID NOT NULL,
    "cardHandleId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_book_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "card_handles_handleName_key" ON "card_handles"("handleName");

-- CreateIndex
CREATE UNIQUE INDEX "card_book_entries_ownerId_cardHandleId_key" ON "card_book_entries"("ownerId", "cardHandleId");

-- AddForeignKey
ALTER TABLE "card_handles" ADD CONSTRAINT "card_handles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_book_entries" ADD CONSTRAINT "card_book_entries_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_book_entries" ADD CONSTRAINT "card_book_entries_cardHandleId_fkey" FOREIGN KEY ("cardHandleId") REFERENCES "card_handles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
