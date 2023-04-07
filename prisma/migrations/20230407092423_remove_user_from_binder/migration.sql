/*
  Warnings:

  - You are about to drop the column `isHidden` on the `Binder` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Binder` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Binder" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Binder" ("id") SELECT "id" FROM "Binder";
DROP TABLE "Binder";
ALTER TABLE "new_Binder" RENAME TO "Binder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
