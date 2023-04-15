/*
  Warnings:

  - Made the column `created_at` on table `ADMIN_ACCOUNT` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `POST` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `USER` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ADMIN_ACCOUNT` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `POST` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `USER` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
