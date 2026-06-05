-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weightKg" REAL NOT NULL,
    "donationType" TEXT NOT NULL DEFAULT 'WHOLE_BLOOD',
    "isFirstTimeDonor" BOOLEAN NOT NULL DEFAULT false,
    "lastDonationDate" TEXT NOT NULL DEFAULT '',
    "eligibleVolume" INTEGER NOT NULL DEFAULT 450,
    "screeningAnswers" TEXT NOT NULL,
    "eligibilityStatus" TEXT NOT NULL,
    "deferralReason" TEXT NOT NULL DEFAULT '',
    "eligibleReturnDate" TEXT NOT NULL DEFAULT '',
    "wantTestResults" BOOLEAN NOT NULL DEFAULT true,
    "declarationAccepted" BOOLEAN NOT NULL DEFAULT false,
    "signedName" TEXT NOT NULL DEFAULT '',
    "consentTimestamp" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "MedicalExam" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "donorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donationDate" TEXT NOT NULL,
    "heightCm" REAL NOT NULL DEFAULT 0,
    "weightKg" REAL NOT NULL,
    "haemoglobin" REAL NOT NULL,
    "temperature" REAL NOT NULL,
    "pulse" INTEGER NOT NULL,
    "bpSystolic" INTEGER NOT NULL,
    "bpDiastolic" INTEGER NOT NULL,
    "finalStatus" TEXT NOT NULL,
    "comments" TEXT NOT NULL DEFAULT '',
    "bloodUnitNumber" TEXT NOT NULL DEFAULT '',
    "bagSegmentNumber" TEXT NOT NULL DEFAULT '',
    "volumeCollected" INTEGER NOT NULL DEFAULT 0,
    "examinedBy" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "MedicalExam_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalExam_donorId_key" ON "MedicalExam"("donorId");
