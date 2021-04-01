/*
  Warnings:

  - The primary key for the `pixel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pixel` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `pixel` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `user`;
