-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_CardSet" ("code", "id", "name") SELECT "code", "id", "name" FROM "CardSet";
DROP TABLE "CardSet";
ALTER TABLE "new_CardSet" RENAME TO "CardSet";
CREATE UNIQUE INDEX "CardSet_name_key" ON "CardSet"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
