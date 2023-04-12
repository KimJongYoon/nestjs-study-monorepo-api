/*
  Warnings:

  - You are about to drop the column `adminEmail` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admin_email` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_adminEmail_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `adminEmail`,
    ADD COLUMN `admin_email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Admin`;

-- CreateTable
CREATE TABLE `AdminAccount` (
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_by` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(191) NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `deleted_by` VARCHAR(191) NULL,
    `use_yn` ENUM('Y', 'N') NOT NULL DEFAULT 'Y',
    `remark` VARCHAR(191) NULL,
    `nick_name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_admin_email_fkey` FOREIGN KEY (`admin_email`) REFERENCES `AdminAccount`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;
