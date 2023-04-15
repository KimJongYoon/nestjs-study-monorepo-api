-- DropIndex
DROP INDEX `POST_created_by_fkey` ON `POST`;

-- AlterTable
ALTER TABLE `POST` ADD COLUMN `read_count` INTEGER NOT NULL DEFAULT 0;
