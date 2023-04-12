/*
  Warnings:

  - You are about to drop the `AdminAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_admin_email_fkey`;

-- DropTable
DROP TABLE `AdminAccount`;

-- CreateTable
CREATE TABLE `ADMIN_ACCOUNT` (
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
ALTER TABLE `Post` ADD CONSTRAINT `Post_admin_email_fkey` FOREIGN KEY (`admin_email`) REFERENCES `ADMIN_ACCOUNT`(`email`) ON DELETE CASCADE ON UPDATE NO ACTION;
