/*
  Warnings:

  - You are about to drop the column `thrumbnail_url` on the `POST` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `POST` DROP COLUMN `thrumbnail_url`,
    ADD COLUMN `thumbnail_url` VARCHAR(191) NULL;
