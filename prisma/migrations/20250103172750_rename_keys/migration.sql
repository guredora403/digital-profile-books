-- AlterTable
ALTER TABLE "identities" RENAME CONSTRAINT "Identity_pkey" TO "identities_pkey";

-- AlterTable
ALTER TABLE "profiles" RENAME CONSTRAINT "Profile_pkey" TO "profiles_pkey";

-- AlterTable
ALTER TABLE "users" RENAME CONSTRAINT "User_pkey" TO "users_pkey";

-- RenameForeignKey
ALTER TABLE "identities" RENAME CONSTRAINT "Identity_userId_fkey" TO "identities_userId_fkey";

-- RenameForeignKey
ALTER TABLE "profiles" RENAME CONSTRAINT "Profile_userId_fkey" TO "profiles_userId_fkey";

-- RenameIndex
ALTER INDEX "Identity_userName_key" RENAME TO "identities_userName_key";
