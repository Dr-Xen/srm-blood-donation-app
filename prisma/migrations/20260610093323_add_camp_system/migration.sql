-- CreateTable
CREATE TABLE "Camp" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campName" TEXT NOT NULL,
    "campDate" TEXT NOT NULL,
    "campTime" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "maxDonors" INTEGER NOT NULL DEFAULT 100,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Camp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampResponse" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "campId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CampResponse_donorId_campId_key" ON "CampResponse"("donorId", "campId");

-- AddForeignKey
ALTER TABLE "CampResponse" ADD CONSTRAINT "CampResponse_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampResponse" ADD CONSTRAINT "CampResponse_campId_fkey" FOREIGN KEY ("campId") REFERENCES "Camp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
