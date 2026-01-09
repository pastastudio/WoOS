/*
  Warnings:

  - You are about to drop the column `locale` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "locale",
ADD COLUMN     "locale_pref" "Locale",
ADD COLUMN     "locale_sys" "Locale" NOT NULL DEFAULT 'EN';
