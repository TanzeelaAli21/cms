/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_resetToken_key" ON "user"("resetToken");
