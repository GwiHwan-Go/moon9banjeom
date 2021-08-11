/*
  Warnings:

  - You are about to drop the `React` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "React" DROP CONSTRAINT "React_photoId_fkey";

-- DropForeignKey
ALTER TABLE "React" DROP CONSTRAINT "React_userId_fkey";

-- DropTable
DROP TABLE "React";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "photoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "howmuch" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like.photoId_userId_unique" ON "Like"("photoId", "userId");

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
