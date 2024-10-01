/*
  Warnings:

  - You are about to drop the column `dateLimit` on the `Chamado_Caracterizado` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `Chamado_Caracterizado` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deadline` to the `Chamado_Caracterizado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chamado_Caracterizado" DROP COLUMN "dateLimit",
DROP COLUMN "points",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
