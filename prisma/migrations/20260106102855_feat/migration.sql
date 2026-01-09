/*
  Warnings:

  - The values [SITE_1,SITE_2,SITE_3,SITE_4,SITE_5] on the enum `Site` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'DE');

-- AlterEnum
BEGIN;
CREATE TYPE "Site_new" AS ENUM ('SITE_1_PLACEHOLDER', 'SITE_2_PLACEHOLDER', 'SITE_3_PLACEHOLDER', 'SITE_4_PLACEHOLDER', 'SITE_5_PLACEHOLDER');
ALTER TABLE "Rating" ALTER COLUMN "site" TYPE "Site_new" USING ("site"::text::"Site_new");
ALTER TYPE "Site" RENAME TO "Site_old";
ALTER TYPE "Site_new" RENAME TO "Site";
DROP TYPE "public"."Site_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'DE';
