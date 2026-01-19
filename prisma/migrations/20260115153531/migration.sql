/*
  Warnings:

  - You are about to drop the column `userId` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Settings` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accent_color` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `displayname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locale_pref` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `locale_sys` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- DropIndex
DROP INDEX "Settings_userId_key";

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "accent_color",
DROP COLUMN "avatar_hash",
DROP COLUMN "displayname",
DROP COLUMN "locale_pref",
DROP COLUMN "locale_sys",
DROP COLUMN "nickname",
DROP COLUMN "username",
DROP COLUMN "verified",
ADD COLUMN     "discord_user_id" BIGINT,
ADD COLUMN     "locale" "Locale" NOT NULL DEFAULT 'EN',
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "DiscordUser" (
    "id" BIGINT NOT NULL,
    "username" TEXT NOT NULL,
    "accent_color" INTEGER,
    "nickname" TEXT NOT NULL,
    "avatar_hash" TEXT,
    "locale" "Locale" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DiscordUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLevel" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "current_quest" INTEGER NOT NULL DEFAULT 0,
    "completed_quests" INTEGER[] DEFAULT ARRAY[0]::INTEGER[],
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "user_level_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLevel_user_id_key" ON "UserLevel"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Settings_user_id_key" ON "Settings"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_discord_user_id_fkey" FOREIGN KEY ("discord_user_id") REFERENCES "DiscordUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLevel" ADD CONSTRAINT "UserLevel_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_user_level_id_fkey" FOREIGN KEY ("user_level_id") REFERENCES "UserLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
