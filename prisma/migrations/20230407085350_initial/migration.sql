-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Binder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Binder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CardInBinder" (
    "cardId" TEXT NOT NULL,
    "binderId" TEXT NOT NULL,

    PRIMARY KEY ("binderId", "cardId"),
    CONSTRAINT "CardInBinder_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardInBinder_binderId_fkey" FOREIGN KEY ("binderId") REFERENCES "Binder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "konamiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "frame" TEXT NOT NULL,
    "atk" INTEGER,
    "def" INTEGER,
    "level" INTEGER,
    "race" TEXT,
    "attribute" TEXT,
    "image" TEXT NOT NULL,
    "imageCropped" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CardSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CardsInCardSet" (
    "cardId" TEXT NOT NULL,
    "cardSetId" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "rarityCode" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    PRIMARY KEY ("cardSetId", "cardId"),
    CONSTRAINT "CardsInCardSet_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CardsInCardSet_cardSetId_fkey" FOREIGN KEY ("cardSetId") REFERENCES "CardSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Card_konamiId_key" ON "Card"("konamiId");

-- CreateIndex
CREATE UNIQUE INDEX "CardSet_name_code_key" ON "CardSet"("name", "code");
