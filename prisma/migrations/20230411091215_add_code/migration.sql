/*
  Warnings:

  - Added the required column `code` to the `CardSet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_CardSet" ("id", "name") SELECT "id", "name" FROM "CardSet";
DROP TABLE "CardSet";
ALTER TABLE "new_CardSet" RENAME TO "CardSet";
CREATE UNIQUE INDEX "CardSet_name_key" ON "CardSet"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
