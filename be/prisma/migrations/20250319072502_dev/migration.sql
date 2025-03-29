-- CreateEnum
CREATE TYPE "UserTransactionType" AS ENUM ('ONCHAIN', 'OFFCHAIN');

-- CreateTable
CREATE TABLE "Event" (
    "signature" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "params" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "synced" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("signature")
);

-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "onChainPoints" INTEGER NOT NULL DEFAULT 0,
    "offChainPoints" INTEGER NOT NULL DEFAULT 0,
    "followers" INTEGER DEFAULT 0,
    "sold" INTEGER DEFAULT 0,
    "created" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "UserTransaction" (
    "id" SERIAL NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "type" "UserTransactionType" NOT NULL,
    "userAddress" TEXT NOT NULL,

    CONSTRAINT "UserTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandyStore" (
    "address" TEXT NOT NULL,
    "owner" TEXT,
    "collection" TEXT,
    "name" TEXT,
    "url" TEXT,
    "manifestId" TEXT,
    "numberOfItems" INTEGER,
    "website" TEXT,
    "x" TEXT,
    "discord" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "telegram" TEXT,
    "description" TEXT,
    "banner" TEXT,
    "minted" INTEGER DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CandyStore_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "CandyStoreComment" (
    "id" SERIAL NOT NULL,
    "candyStoreAddress" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "CandyStoreComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "address" TEXT NOT NULL,
    "collection" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "candyStoreAddress" TEXT NOT NULL,

    CONSTRAINT "Phase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartDate" (
    "id" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "phaseId" TEXT NOT NULL,

    CONSTRAINT "StartDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EndDate" (
    "id" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "phaseId" TEXT NOT NULL,

    CONSTRAINT "EndDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MintLimit" (
    "id" TEXT NOT NULL,
    "mintLimitId" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL,
    "phaseId" TEXT NOT NULL,

    CONSTRAINT "MintLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allocation" (
    "id" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "allocationId" INTEGER NOT NULL,
    "phaseId" TEXT NOT NULL,

    CONSTRAINT "Allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolPayment" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "phaseId" TEXT NOT NULL,

    CONSTRAINT "SolPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllowList" (
    "id" TEXT NOT NULL,
    "merkleRoot" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,

    CONSTRAINT "AllowList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "address" TEXT NOT NULL,
    "admin" TEXT NOT NULL,
    "treasury" TEXT NOT NULL,
    "transactionFee" INTEGER NOT NULL,
    "collection" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "StartDate_phaseId_key" ON "StartDate"("phaseId");

-- CreateIndex
CREATE UNIQUE INDEX "EndDate_phaseId_key" ON "EndDate"("phaseId");

-- CreateIndex
CREATE UNIQUE INDEX "MintLimit_phaseId_key" ON "MintLimit"("phaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Allocation_phaseId_key" ON "Allocation"("phaseId");

-- CreateIndex
CREATE UNIQUE INDEX "SolPayment_phaseId_key" ON "SolPayment"("phaseId");

-- CreateIndex
CREATE UNIQUE INDEX "AllowList_phaseId_key" ON "AllowList"("phaseId");

-- AddForeignKey
ALTER TABLE "UserTransaction" ADD CONSTRAINT "UserTransaction_userAddress_fkey" FOREIGN KEY ("userAddress") REFERENCES "User"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phase" ADD CONSTRAINT "Phase_candyStoreAddress_fkey" FOREIGN KEY ("candyStoreAddress") REFERENCES "CandyStore"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartDate" ADD CONSTRAINT "StartDate_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndDate" ADD CONSTRAINT "EndDate_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintLimit" ADD CONSTRAINT "MintLimit_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolPayment" ADD CONSTRAINT "SolPayment_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllowList" ADD CONSTRAINT "AllowList_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
