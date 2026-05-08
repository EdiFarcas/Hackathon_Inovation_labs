-- CreateTable
CREATE TABLE "MouseBuild" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "baseColor" TEXT NOT NULL,
    "switchType" TEXT NOT NULL,
    "leftArtwork" TEXT NOT NULL,
    "rightArtwork" TEXT NOT NULL,
    "backArtwork" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MouseBuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitlistEntry" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistEntry_email_key" ON "WaitlistEntry"("email");
