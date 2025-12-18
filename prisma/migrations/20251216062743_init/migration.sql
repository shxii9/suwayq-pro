/*
  Warnings:

  - The values [EXPIRED] on the enum `ListingStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `description` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ListingStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'REJECTED');
ALTER TABLE "Listing" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Listing" ALTER COLUMN "status" TYPE "ListingStatus_new" USING ("status"::text::"ListingStatus_new");
ALTER TYPE "ListingStatus" RENAME TO "ListingStatus_old";
ALTER TYPE "ListingStatus_new" RENAME TO "ListingStatus";
DROP TYPE "ListingStatus_old";
ALTER TABLE "Listing" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_listingId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_targetUserId_fkey";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "description",
DROP COLUMN "images",
DROP COLUMN "location",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Report";
