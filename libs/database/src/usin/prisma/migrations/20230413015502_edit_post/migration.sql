/*
  Warnings:

  - Added the required column `admin_email` to the `POST` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `POST` DROP FOREIGN KEY `POST_created_by_fkey`;

-- AlterTable
ALTER TABLE `POST` ADD COLUMN `admin_email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `POST` ADD CONSTRAINT `POST_admin_email_fkey` FOREIGN KEY (`admin_email`) REFERENCES `ADMIN_ACCOUNT`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;
