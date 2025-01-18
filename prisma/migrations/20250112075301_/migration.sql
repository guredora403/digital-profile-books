-- CreateTable
CREATE TABLE "edged_identities" (
    "id" SERIAL NOT NULL,
    "sourceId" UUID NOT NULL,
    "targetUserId" UUID NOT NULL,
    "targetIdentityId" INTEGER NOT NULL,

    CONSTRAINT "edged_identities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "edged_identities_sourceId_targetUserId_key" ON "edged_identities"("sourceId", "targetUserId");

-- AddForeignKey
ALTER TABLE "edged_identities" ADD CONSTRAINT "edged_identities_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edged_identities" ADD CONSTRAINT "edged_identities_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edged_identities" ADD CONSTRAINT "edged_identities_targetIdentityId_fkey" FOREIGN KEY ("targetIdentityId") REFERENCES "identities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
