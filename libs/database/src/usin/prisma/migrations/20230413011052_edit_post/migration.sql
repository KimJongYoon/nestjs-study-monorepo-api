/*
  Warnings:

  - You are about to drop the column `admin_email` on the `POST` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `POST` DROP FOREIGN KEY `POST_admin_email_fkey`;

-- AlterTable
ALTER TABLE `POST` DROP COLUMN `admin_email`,
    ADD COLUMN `thrumbnail_url` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `POST` ADD CONSTRAINT `POST_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `ADMIN_ACCOUNT`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;
