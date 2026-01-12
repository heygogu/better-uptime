-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('UP', 'DOWN', 'TIMEOUT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "UserWebsite" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "UserWebsite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteRegion" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "status" "HealthStatus" NOT NULL,
    "ping" INTEGER,

    CONSTRAINT "WebsiteRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserWebsite_userId_websiteId_key" ON "UserWebsite"("userId", "websiteId");

-- CreateIndex
CREATE UNIQUE INDEX "WebsiteRegion_websiteId_regionId_key" ON "WebsiteRegion"("websiteId", "regionId");

-- AddForeignKey
ALTER TABLE "UserWebsite" ADD CONSTRAINT "UserWebsite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWebsite" ADD CONSTRAINT "UserWebsite_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteRegion" ADD CONSTRAINT "WebsiteRegion_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteRegion" ADD CONSTRAINT "WebsiteRegion_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
