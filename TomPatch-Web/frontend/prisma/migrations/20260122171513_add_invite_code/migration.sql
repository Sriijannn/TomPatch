/*
  Warnings:

  - A unique constraint covering the columns `[orgCode]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgCode` to the `Organisation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "orgCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_orgCode_key" ON "Organisation"("orgCode");
